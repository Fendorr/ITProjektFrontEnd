import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { PublicService } from 'src/api/generated/controllers/Public';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';
import { RefreshService } from 'src/app/services/refreshComponent.service';

@Component({
  selector: 'app-invitation-carousel-item',
  templateUrl: './invitation-carousel-item.component.html',
  styleUrls: ['./invitation-carousel-item.component.scss']
})
export class InvitationCarouselItemComponent implements OnInit {

  @Input() invite: ProjectDTO;

  user: UserDTO;

  constructor(
    private publicService: PublicService,
    private interService: InteractionService,
    private refreshService: RefreshService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  //Join project via invitation
  joinProject() {
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      this.interService
      .addMember({id: this.user.id!, projectId: this.invite.id! })
      .subscribe(response => {
        this.router.navigate(['/project', this.invite.id!]);
      });
    })
  }

  //Decline invitation to a project
  declineInvitation() {
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      this.interService
      .inviteUser({id: this.user.id!, projectId: this.invite.id! })
      .subscribe(response => {
        this.refreshService.reloadComponent();
      });
    })
  }

}
