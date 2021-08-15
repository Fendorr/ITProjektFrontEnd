import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO } from 'src/api/generated/model';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  projects : ProjectDTO [] = [];
  project : ProjectDTO;
  constructor(private _projectService : ProjectService){}
  ngOnInit(): void {
   this.exampleGetAll();
  }
  exampleGetAll(){
    this._projectService.getAllProjectsUsingGET().subscribe(response => this.projects = response)
  }
  exampleDelete(id : number){
    this._projectService.deleteProjectUsingDELETE({id: id}).subscribe(response => console.log(response))
  }
  exampleGetById(id : number){
    this._projectService.getProjectByIdUsingGET({id: id}).subscribe(response => this.project = response);
  }
  examplePost(newProject : ProjectDTO){
    this._projectService.postProjectUsingPOST({project : newProject}).subscribe(response => console.log(response))
  }
  exampleUpdate(id : number,newProject : ProjectDTO){
    this._projectService.updateProjectUsingPUT({id: id,project : newProject}).subscribe(response => console.log(response))
  }
}
