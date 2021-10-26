import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';
import { PublicService } from 'src/api/generated/controllers/Public';
import { Router } from '@angular/router';

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
    private router: Router
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

  
  createProject(): void {
    this.project.projectLikes = []; //SetEmpty damit nicht NULL
    this.project.projectApplicants = [];
    this.project.invitedUsers = [];
    this.project.members = [];
    this.project.currUser = 1;
    this.project.tags = this.tags.map(a => a.name); //Tags von Object-Array in String-Array mappen.
    this.publicService.curUser() //Add current user as admin + as member
      .subscribe(response => {
      this.user = response;
      console.log(response);
        if(this.user) {
          this.project.members!.push(this.user.id!);
          this.project.adminId = this.user.id;
          this.project.createdBy = this.user.email; //Sollte später wohl First + Lastname sein

          //Projekt wird hier erstellt, damit die vorherigen Daten auch da sind!
          this.projectService.postProjectUsingPOST({project:this.project})
            .subscribe(project => {
              //localhost:8080/api/project/**
              this.router.navigate(['/project', project.slice(27)])
          });
        }
    });

    console.log(this.project);
  }
}
