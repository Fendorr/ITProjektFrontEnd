import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { ProjectDTO } from 'src/api/generated/defs/ProjectDTO';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { RefreshService } from 'src/app/services/refreshComponent.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from '../../new-project/new-project.component';

@Component({
  selector: 'app-project-detail-edit',
  templateUrl: './project-detail-edit.component.html',
  styleUrls: ['./project-detail-edit.component.scss']
})
export class ProjectDetailEditComponent implements OnInit {

  user: UserDTO;
  project: ProjectDTO;
  spinnerValue: number;
  isMember: boolean = false;
  isAdmin: boolean = false;
  isApplicant: boolean = false;
  isLiked: boolean = false;
  displayMembers: UserDTO[] = [];
  displayLikes: UserDTO[] = [];
  displayApplicants: UserDTO[] = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private interService: InteractionService,
    private publicService: PublicService,
    private userService: UserService,
    private refreshService: RefreshService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDetailEditComponent>
  ) { }

  ngOnInit(): void {
    //nimmt p_id aus URL und holt das projekt aus der DB
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService
        .getProjectByIdUsingGET({ id })
        .subscribe((response) => {
          this.project = response;
          //Member Kreis laden
          if (this.project.currUser && this.project.maxUser) {
            this.spinnerValue =
              (this.project.currUser * 100) / this.project.maxUser;
          } else {
            this.spinnerValue = 0;
          }
          this.project.tags!.map(a => this.tags.push({ name: a }));
          //Flag setzen wenn curUser ist Member, ist Admin, ist Applicant
          this.publicService.curUser().subscribe((response) => {
            this.user = response;
            if (this.user.id !== this.project.adminId!) {
              this.router.navigate(['/project', this.user.activeProject])
            }
          });
        });
    });
  }




  openSnackBar(msg: string, clss: string, longer?: number): void {
    if (longer) {
      this.snackBar.open(msg, '', {
        panelClass: [clss],
        duration: longer
      });
    }
    else {
      this.snackBar.open(msg, '', {
        panelClass: [clss],
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        content:
          'Möchten Sie die Änderungen des Projekts übernehmen?',
        buttonLabels: ['Speichern', 'Zurück'],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 0) {
        this.updateProject(this.project.id, this.project);
      }
    });
  }

  updateProject(id: number | undefined, newProject: ProjectDTO): void {
    let maxUserCorr: string = "";
    let longer: number;
    newProject.tags = this.tags.map(a => a.name);
    if (newProject.maxUser! < newProject.currUser!) {

      newProject.maxUser! = newProject.currUser!
      maxUserCorr = " Maximale Mitgliederanzahl darf nicht niedriger sein\nals die aktuelle Mitgliederanzahl.";
      longer = 4500;
    }
    if (id) {
      this.projectService
        .updateProjectUsingPUT({ id: id, project: newProject })
        .subscribe(
          (response) => {
            this.openSnackBar('Daten erfolgreich geändert!' + maxUserCorr, 'success', longer);
          },
          (error) => {
            this.openSnackBar(
              'Fehler: Daten konnten nicht geändert werden',
              'warn'
            );
          }
        );
      this.router.navigate(['/project/', this.user.activeProject])
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({ name: value });
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
}