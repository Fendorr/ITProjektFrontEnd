import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO } from 'src/api/generated/defs/ProjectDTO';

@Component({
  selector: 'app-projects-list-item',
  templateUrl: './projects-list-item.component.html',
  styles: [`
    mat-card {
      margin-bottom: 20px;
    }

    mat-card-subtitle {
      margin-bottom: 5px;
    }

    .mat-standard-chip {
      min-height: 26px;
    }

    mat-chip {
      font-size: 12px;
      padding: 2px 10px;
    }

    mat-card-content {
      margin: 5px 0 5px;
    }

    mat-card-actions {
      padding: 0;
      display: flex;
      justify-content: space-between;
    }

    .mat-card-avatar {
      height: 50px;
      width: 60px;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
    }

  `]
})
export class ProjectsListItemComponent implements OnInit {
  @Input() project: ProjectDTO;

  imgPath: string;
  randomInt: number;

  constructor(private ProjectService: ProjectService) { }

  ngOnInit(): void {
    //? Der ImgPath erstellt einen RandomAvatar für das Projekt -> Später random durch proj_id ersetzen.
    this.imgPath = 'https://avatars.dicebear.com/api/bottts/' + this.project.id + '.svg'
  }

}
