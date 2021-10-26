import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';
import { RefreshService } from 'src/app/services/refreshComponent.service';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  @Input() applicant: UserDTO;

  project: ProjectDTO;

  constructor(
    private publicService: PublicService,
    private interService: InteractionService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private refreshService: RefreshService
  ) { }

  ngOnInit(): void {

  }

  //Add the applicant
  addMember():void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService
        .getProjectByIdUsingGET({id})
        .subscribe(response => {
          this.project = response;
          this.interService
            .addMember({id: this.applicant.id!, projectId: this.project.id!})
            .subscribe(response => {
              console.log("user "+ this.applicant.id + " added to " + this.project.id)
              this.refreshService.reloadComponent();
            });
        });
    });
  }

  //Decline the Application
  declineApplication():void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService
        .getProjectByIdUsingGET({id})
        .subscribe(response => {
          this.project = response;
          this.interService
            .applyToProject({id: this.applicant.id!, projectId: this.project.id!})
            .subscribe(response => {
              console.log("declined user "+ this.applicant.id + "s application to " + this.project.id)
              this.refreshService.reloadComponent();
            });
        });
    });
  }

}
