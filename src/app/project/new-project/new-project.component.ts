import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO } from 'src/api/generated/model';

export interface Tag {
  name: string;
}
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  project: ProjectDTO = {};

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [
    {name: 'Angular'},
    {name: 'TypeScript'},
  ];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  
  createProject(): void {
    console.log(this.project);
    this.project.createdBy = "Simon (DEV)" //Hardcode wegen Styling später User_id!
    this.project.currUser = 1; // Muss Hardcode weil Projekt startet immer mit 1 User.

    this.project.tags = this.tags.map(a => a.name); //Tags von Object-Array in String-Array mappen.

    this.projectService.postProjectUsingPOST({project:this.project}).subscribe(project => console.log(project));
    
  }
}
