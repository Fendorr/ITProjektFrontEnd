import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO } from 'src/api/generated/defs/ProjectDTO';



@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projects: ProjectDTO[];

  constructor(private ProjectService: ProjectService) { }

  ngOnInit(): void {
    this.ProjectService.getAllProjectsUsingGET().subscribe(response => this.projects = response);
  }

}
