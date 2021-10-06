import { NumberFormatStyle } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO } from 'src/api/generated/model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit{

  project: ProjectDTO;
  // current: number;
  // max: number;
  // spinnerValue: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    //nimmt p_id aus URL und holt das projekt aus der DB
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService.getProjectByIdUsingGET({id}).subscribe(response => this.project = response);
    });

    // this.current = this.project.currUser?
    // this.max = this.project.maxUser?

    // this.spinnerValue = (this.current / this.max * 100)


    // if(this.project.currUser && this.project.maxUser){
    //   this.spinnerValue = ( this.project.currUser / this.project.maxUser * 100)
    // }
    // else { this.spinnerValue = 100; }

  }

}
