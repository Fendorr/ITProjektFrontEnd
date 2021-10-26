import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';
import { RefreshService } from 'src/app/services/refreshComponent.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit,OnDestroy {

  user: UserDTO;
  project: ProjectDTO;
  spinnerValue: number;
  isMember: boolean = false;
  isAdmin: boolean = false;
  displayMembers: UserDTO[] = [];
  displayLikes: UserDTO[] = [];
  displayApplicants: UserDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private interService: InteractionService,
    private publicService: PublicService,
    private userService: UserService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    //nimmt p_id aus URL und holt das projekt aus der DB
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService
        .getProjectByIdUsingGET({id})
        .subscribe(response => {
          this.project = response;
          //Member Kreis laden
          if(this.project.currUser && this.project.maxUser){
            this.spinnerValue = ( this.project.currUser * 100 / this.project.maxUser);
          }
          else { this.spinnerValue = 0; }
          //Holen der ProjectMembers als UserDTOs
          this.project.members!.forEach(member => {
            this.userService.getUserByIdUsingGET({id: member})
              .subscribe(user => {
                this.displayMembers.push(user);
              })
          })
          //Flag setzen wenn curUser ist Member (und Admin)
          this.publicService.curUser().subscribe(response => {
            this.user = response;
            if(this.user.id === this.project.adminId!){
              this.isAdmin = true;
              console.log("is admin");
            }
            this.project.members!.forEach(member => {
              if(this.user.id === member){
                this.isMember = true;
              }
            })
          })
          //Holen der ProjectLikes als UserDTOs //TODO HIER NOCH DIE USER AUSSORTIEREN DIE SCHON MEMBER SIND
          this.project.projectLikes!.forEach(like => {
            this.userService.getUserByIdUsingGET({id: like})
              .subscribe(user => {
                this.displayLikes.push(user);
              });
          });
          //Holen der ProjectApplicants als UserDTOs
          this.project.projectApplicants!.forEach(like => {
            this.userService.getUserByIdUsingGET({id: like})
              .subscribe(user => {
                this.displayApplicants.push(user);
              });
          });
        });
    });
  }

  addMember():void {
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      //console.log(this.user);
      if(this.project.id && this.user.id){
        this.interService
          .addMember({id: this.user.id, projectId: this.project.id })
          .subscribe(response => {
            this.refreshService.reloadComponent();
          });
      }
    })
  }

  apply():void {
    //Apply for project here!
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      if(this.project.id && this.user.id){
        this.interService
          .applyToProject({id: this.user.id, projectId: this.project.id })
          .subscribe(response => response);
      }
    })
  }

  ngOnDestroy():void{
    //console.log(this.project);
  }
}
