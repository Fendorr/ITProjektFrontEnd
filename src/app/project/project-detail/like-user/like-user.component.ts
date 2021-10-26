import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';

@Component({
  selector: 'app-like-user',
  templateUrl: './like-user.component.html',
  styleUrls: ['./like-user.component.scss']
})
export class LikeUserComponent implements OnInit {

  @Input() likeUser: UserDTO;
  
  project: ProjectDTO;

  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private interService: InteractionService
  ) { }

  ngOnInit(): void {
  }

  //INVITE USER METHOD
  inviteUser() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService
        .getProjectByIdUsingGET({id})
        .subscribe(response => {
          this.project = response;
          this.interService
            .inviteUser({id: this.likeUser.id!, projectId: this.project.id!})
            .subscribe(response => {console.log("user "+ this.likeUser.id + " invited to " + this.project.id )});
        });
    });
  }
}
