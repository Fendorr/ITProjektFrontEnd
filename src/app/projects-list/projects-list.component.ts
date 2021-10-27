import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { ProjectDTO } from 'src/api/generated/defs/ProjectDTO';
import { UserDTO } from 'src/api/generated/model';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectsListComponent implements OnInit{

  projects: ProjectDTO[];
  user: UserDTO;

  constructor(
    private publicService: PublicService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.publicService.project().subscribe(response => this.projects = response);
  }
}
