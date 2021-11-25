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
  isFiltered: boolean = false;
  filters = {
    members: 0,
    createdAt: 0,
    popularity: 0,
    noFullProjects: false,
    hasProfessor: false,
  }

  constructor(
    private publicService: PublicService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    //holt alle projekte aus der DB
    this.publicService.project().subscribe(response => this.projects = response);
  }

  OnFilter() : void {
    //filter our list
    this.isFiltered = true;
  }

  SortList() : void {
    //Sort our projects list
  }

  OnUnfilter() : void {
    //Unfilter the list
    this.isFiltered = false;
    this.publicService.project().subscribe(response => this.projects = response);
  }

  OnFilterChange(filter :string): void {
    if(filter === "members"){
      this.filters.members === 2 ? this.filters.members = 0 : this.filters.members++;
      this.filters.createdAt = 0;
      this.filters.popularity = 0;
    }
    else if(filter === "createdAt"){
      this.filters.createdAt === 2 ? this.filters.createdAt = 0 : this.filters.createdAt++;
      this.filters.members = 0;
      this.filters.popularity = 0;
    }
    else if(filter === "popularity"){
      this.filters.popularity === 2 ? this.filters.popularity = 0 : this.filters.popularity++;
      this.filters.createdAt = 0;
      this.filters.members = 0;
    }
    console.log(this.filters)
  }
}
