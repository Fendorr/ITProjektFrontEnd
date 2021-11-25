import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { ProjectDTO } from 'src/api/generated/defs/ProjectDTO';
import { UserDTO } from 'src/api/generated/model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RefreshService } from 'src/app/services/refreshComponent.service';

@Component({
  selector: 'app-projects-list-item',
  templateUrl: './projects-list-item.component.html',
  styleUrls: ['./projects-list-item.component.scss']
})
export class ProjectsListItemComponent implements OnInit, OnChanges {
  @Input() project: ProjectDTO = {};

  user: UserDTO = {};
  imgPath: string;
  randomInt: number;
  dateFormat: string;
  isLiked: boolean;

  constructor(
    private ProjectService: ProjectService,
    private publicService :PublicService,
    private userService : UserService,
    private interService: InteractionService,
    private refreshService: RefreshService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.imgPath = 'https://avatars.dicebear.com/api/jdenticon/' + this.project.id + '.svg'
    this.dateFormat = this.formatDate(this.project);
    this.checkProjectLike();
  }

  ngOnChanges(): void {
    this.checkProjectLike();
  }

  formatDate(project: ProjectDTO) {
    let year = project.createdAt!.slice(0,4);
    let month = project.createdAt!.slice(4,6);
    let day = project.createdAt!.slice(6);

    return "Erstellt am "+ day +"."+ month +"."+ year +" von "+ project.createdBy
  }

  likeProject() {
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      //console.log(this.user);
      if(this.project.id && this.user.id){
        this.interService
          .likeProject({id: this.project.id, userId: this.user.id })
          .subscribe((response) => {this.refreshService.reloadComponent()});
      }
    })
  }

  checkProjectLike(): void {
    if(this.authService.isLoggedIn){
      this.publicService.curUser().subscribe(response => {
        this.user = response;
        if(this.project.projectLikes?.includes(this.user.id!)){
          this.isLiked = true;
        } else { this.isLiked = false; }
      })
    }
  }

}
