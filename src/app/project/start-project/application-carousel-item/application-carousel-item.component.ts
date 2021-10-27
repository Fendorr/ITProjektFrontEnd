import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() successPop = new EventEmitter();
  @Output() failPop = new EventEmitter();

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
      .subscribe((response) => {
        this.successPop.emit("Bewerbung zurückgezogen!")
        this.refreshService.reloadComponent();
      }, (error) => this.failPop.emit("Fehler: Bewerbung zurückziehen fehlgeschlagen!"));
    })
  }
}
