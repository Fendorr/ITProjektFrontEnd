import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { ProjectDTO } from 'src/api/generated/defs/ProjectDTO';



@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projects: ProjectDTO[];

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.publicService.project().subscribe(response => this.projects = response);
  }

}
