import { NumberFormatStyle } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO } from 'src/api/generated/model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit,OnDestroy{

  project: ProjectDTO
  current?: number | undefined;
  max?: number | undefined;
  spinnerValue: number;

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
  }

  ngOnDestroy():void{
    console.log(this.project);
  }

  // this.current = this.project.currUser;
  // this.max = this.project.maxUser;

  // if(this.current && this.max && this.project){
  //   this.spinnerValue = ( this.current * 100 / this.max);
  // }
  // else { this.spinnerValue = 50; }

}
