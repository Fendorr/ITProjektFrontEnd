import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';
import { PublicService } from 'src/api/generated/controllers/Public';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';

export interface Tag {
  name: string;
}
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  project: ProjectDTO = {};
  user: UserDTO;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [
    {name: 'Angular'},
    {name: 'TypeScript'},
  ];

  constructor(
    private projectService: ProjectService,
    private publicService: PublicService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  openSnackBar(msg: string, clss: string): void {
    this.snackBar.open(msg, '',{
      panelClass: [clss]
    });
  }

  
  createProject(): void {
    this.project.projectLikes = []; //SetEmpty damit nicht NULL
    this.project.projectApplicants = [];
    this.project.invitedUsers = [];
    this.project.chat = [];
    this.project.members = [];
    this.project.currUser = 1;
    this.project.tags = this.tags.map(a => a.name); //Tags von Object-Array in String-Array mappen.
    this.publicService.curUser() //Add current user as admin + as member
      .subscribe(response => {
      this.user = response;
        if(this.user) {
          this.project.members!.push(this.user.id!);
          this.project.adminId = this.user.id;
          this.project.createdBy = this.user.email; //Sollte später wohl First + Lastname sein

          //Projekt wird hier erstellt, damit die vorherigen Daten auch da sind!
          this.projectService.postProjectUsingPOST({id: this.user.id!, project:this.project})
            .subscribe((project) => {
              this.openSnackBar("Projekt erfolgreich erstellt!", 'success');
              this.publicService.curUser() //Add current user as admin + as member
                .subscribe(response => {
                  this.authService.currProjId = response.activeProject;
                  this.router.navigate(['/project', response.activeProject]);
                })
          }, (error) => {this.openSnackBar("Fehler: Projekt konnte nicht erstellt werden!", 'warn')});
        }
    });
  }
}
