import { Component, OnInit } from '@angular/core';

import { Project } from './project.model';
import { ProjectListService } from './projectlist.service';
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styles: [
  ]
})
export class ProjectsListComponent implements OnInit {

  projects: Project[];

  constructor(private projectListService: ProjectListService) { }

  ngOnInit(): void {
    this.projects = this.projectListService.getProjects();
    console.log(this.projects);
  }

}
