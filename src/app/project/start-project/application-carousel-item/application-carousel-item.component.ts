import { Component, Input, OnInit } from '@angular/core';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { PublicService } from 'src/api/generated/controllers/Public';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';
import { RefreshService } from 'src/app/services/refreshComponent.service';

@Component({
  selector: 'app-application-carousel-item',
  templateUrl: './application-carousel-item.component.html',
  styleUrls: ['./application-carousel-item.component.scss']
})
export class ApplicationCarouselItemComponent implements OnInit {

  @Input() application: ProjectDTO;

  user: UserDTO;

  constructor(
    private publicService: PublicService,
    private interService: InteractionService,
    private refreshService: RefreshService
  ) { }

  ngOnInit(): void {
  }

  //Cancel application to project
  popApplication() {
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      this.interService
      .applyToProject({id: this.user.id!, projectId: this.application.id! })
      .subscribe(response => {
        this.refreshService.reloadComponent();
      });
    })
  }
}
