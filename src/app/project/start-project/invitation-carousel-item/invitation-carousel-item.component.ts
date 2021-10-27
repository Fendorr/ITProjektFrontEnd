import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
  @Output() successJoin = new EventEmitter();
  @Output() failJoin = new EventEmitter();
  @Output() successDecl = new EventEmitter();
  @Output() failDecl = new EventEmitter();

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
      .subscribe((response) => {
        this.successJoin.emit("Projekt beigetreten!");
        this.router.navigate(['/project', this.invite.id!]);
      }, (error) => {this.failJoin.emit("Fehler: Projekt beitreten fehlgeschlagen!")});
    })
  }

  //Decline invitation to a project
  declineInvitation() {
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      this.interService
      .inviteUser({id: this.user.id!, projectId: this.invite.id! })
      .subscribe((response) => {
        this.successDecl.emit("Einladung abgelehnt!");
        this.refreshService.reloadComponent();
      }, (error) => {this.failDecl.emit("Fehler: Einladung ablehnen fehlgeschlagen!");});
    })
  }

}
