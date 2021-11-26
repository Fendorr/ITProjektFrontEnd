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

  projects: ProjectDTO[] = [];
  user: UserDTO;
  noFullProjects: boolean = false;
  hasProfessor: boolean = false;
  members = 0;
  createdAt = 0;
  popularity = 0;

  constructor(
    private publicService: PublicService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    //holt alle projekte aus der DB
    this.publicService.project().subscribe(response => this.projects = response);
  }

  OnFilterChange(filter :string): void {
    if(filter === "members"){
      this.members === 2 ? this.members = 0 : this.members++;
      this.createdAt = 0;
      this.popularity = 0;
    }
    else if(filter === "createdAt"){
      this.createdAt === 2 ? this.createdAt = 0 : this.createdAt++;
      this.members = 0;
      this.popularity = 0;
    }
    else if(filter === "popularity"){
      this.popularity === 2 ? this.popularity = 0 : this.popularity++;
      this.createdAt = 0;
      this.members = 0;
    }
  }
}
