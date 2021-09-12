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

      div {
        display: flex;
        flex-direction: row;
        
        h3 {
          margin-left: 10px;
        }
      }
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
  dateFormat: string;

  constructor(private ProjectService: ProjectService) { }

  ngOnInit(): void {
    //? Der ImgPath erstellt einen RandomAvatar für das Projekt -> Später random durch proj_id ersetzen.
    this.imgPath = 'https://avatars.dicebear.com/api/bottts/' + this.project.id + '.svg'
    this.dateFormat = this.formatDate(this.project);
  }

  formatDate(project: ProjectDTO) {
    let year = project.createdAt?.slice(0,4);
    let month = project.createdAt?.slice(6,7);
    let day = project.createdAt?.slice(9,10);

    return "Erstellt am "+ day +"."+ month +"."+ year +" von "+ project.createdBy
  }

}
