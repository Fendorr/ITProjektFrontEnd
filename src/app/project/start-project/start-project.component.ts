import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';

@Component({
  selector: 'app-startproject',
  templateUrl: './start-project.component.html',
  styleUrls: ['./start-project.component.scss',]
})
export class StartprojectComponent implements OnInit {

  displayInvitations: ProjectDTO[] = [];
  displayApplications: ProjectDTO[] = [];

  user: UserDTO;

  constructor(
    private publicService: PublicService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      //Get projects that user has been invited to
      this.user.projectInvites!.forEach(invite => {
        this.projectService.getProjectByIdUsingGET({id: invite})
        .subscribe(project => {
          this.displayInvitations.push(project);
        })
      })
      //Get projects that user has applied to
      this.user.sentApplications!.forEach(invite => {
        this.projectService.getProjectByIdUsingGET({id: invite})
        .subscribe(project => {
          this.displayApplications.push(project);
        })
      })
    })
  }

  openSnackBar(msg: string, clss: string): void {
    this.snackBar.open(msg, '',{
      panelClass: [clss]
    });
  }

}
