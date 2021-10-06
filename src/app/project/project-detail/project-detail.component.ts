import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO } from 'src/api/generated/model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit,OnDestroy,DoCheck{

  project: ProjectDTO
  spinnerValue: number;

  applicants: Number[] = [
    1,2,3,4,5
  ]

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

  ngDoCheck(): void {
    if(this.project){
      if(this.project.currUser && this.project.maxUser){
        this.spinnerValue = ( this.project.currUser * 100 / this.project.maxUser);
      }
      else { this.spinnerValue = 0; }
    }
  }

  ngOnDestroy():void{
    //console.log(this.project);
  }

}
