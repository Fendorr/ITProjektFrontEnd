import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-liked-projects-list',
  templateUrl: './liked-projects-list.component.html',
  styleUrls: ['./liked-projects-list.component.scss']
})
export class LikedProjectsListComponent implements OnInit {
  user: UserDTO;
  displayProjects: ProjectDTO[] = [];

  constructor(private projectService: ProjectService, private publicService: PublicService) { }

  ngOnInit(): void {
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      if(this.user) {
        this.user.likedProjects!.forEach(project => {
          this.projectService.getProjectByIdUsingGET({id: project})
          .subscribe(response => {
            this.displayProjects.push(response);
          });
        });
      }
    })
    
  }

}
