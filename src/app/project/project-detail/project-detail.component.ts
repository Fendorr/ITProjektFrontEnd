import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';
import { RefreshService } from 'src/app/services/refreshComponent.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

export interface Chat {
  name: string,
  msg: string
}

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnChanges {
  user: UserDTO;
  project: ProjectDTO;
  professor: UserDTO;
  spinnerValue: number;
  isMember: boolean = false;
  isAdmin: boolean = false;
  isProf: boolean = false;
  isApplicant: boolean = false;
  isLiked: boolean = false;
  displayMembers: UserDTO[] = [];
  displayLikes: UserDTO[] = [];
  displayApplicants: UserDTO[] = [];
  displayChat: Chat[] = []
  chatMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private interService: InteractionService,
    private publicService: PublicService,
    private userService: UserService,
    private refreshService: RefreshService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDetailComponent>
  ) {}

  ngOnInit(): void {
    //nimmt p_id aus URL und holt das projekt aus der DB
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService
        .getProjectByIdUsingGET({ id })
        .subscribe((response) => {
          this.project = response;
          //Member Kreis laden
          if (this.project.currUser && this.project.maxUser) {
            this.spinnerValue =
              (this.project.currUser * 100) / this.project.maxUser;
          } else {
            this.spinnerValue = 0;
          }
          //Holen der ProjectMembers als UserDTOs
          this.project.members!.forEach((member) => {
            this.userService
              .getUserByIdUsingGET({ id: member })
              .subscribe((user) => {
                this.displayMembers.push(user);
              });
          });
          //Flag setzen wenn curUser ist Member, ist Admin, ist Applicant
          this.publicService.curUser().subscribe((response) => {
            this.user = response;
            if (this.user.id === this.project.adminId!) {
              this.isAdmin = true;
            }
            this.project.members!.forEach((member) => {
              if (this.user.id === member || this.user.id === this.project.professorId) {
                this.isMember = true;
              }
            });
            this.project.projectApplicants!.forEach((applicant) => {
              if (applicant === this.user.id) {
                this.isApplicant = true;
              }
            });
          });
          //Prof aus der DB fetchen
          if(this.project.professorId !== null){
            this.userService.getUserByIdUsingGET({id: this.project.professorId!}).subscribe((prof) => {
              this.professor = prof;
              this.isProf = true;
            }, (error) => {error});
          }
          //Holen der ProjectLikes als UserDTOs
          this.project.projectLikes!.forEach((like) => {
            if (!this.project.members!.includes(like)) {
              this.userService
                .getUserByIdUsingGET({ id: like })
                .subscribe((user) => {
                  this.displayLikes.push(user);
                });
            }
          });
          //Holen der ProjectApplicants als UserDTOs
          this.project.projectApplicants!.forEach((like) => {
            this.userService
              .getUserByIdUsingGET({ id: like })
              .subscribe((user) => {
                this.displayApplicants.push(user);
              });
          });
          //Holen der Chat messages
          this.project.chat!.forEach((chat) => {
            let ChatArr = chat.split("%%%");
            this.userService.getUserByIdUsingGET({id: Number(ChatArr[0])})
              .subscribe((response) => {
                this.displayChat.push({name: response.email!, msg: ChatArr[1]})
              })
          })
        });
    });

    this.checkProjectLike();
  }

  ngOnChanges(): void {
    this.checkProjectLike();
  }

  addMember(): void {
    this.publicService.curUser().subscribe((response) => {
      this.user = response;
      if (this.project.id && this.user.id) {
        this.interService
          .addMember({ id: this.user.id, projectId: this.project.id })
          .subscribe(
            (response) => {
              this.openSnackBar('Projekt verlassen!', 'success');
              if (this.project.members!.length <= 1) {
                //umleiten wenn das projekt gelöscht wird
                this.router.navigate(['/projects']);
              } else {
                this.refreshService.reloadComponent();
              }
            },
            (error) => {
              this.openSnackBar(
                'Fehler: Projekt verlassen fehlgeschlagen',
                'warn'
              );
            }
          );
      }
    });
  }

  apply(): void {
    //Apply for project here!
    this.publicService.curUser().subscribe((response) => {
      this.user = response;
      if (this.project.id && this.user.id) {
        this.interService
          .applyToProject({ id: this.user.id, projectId: this.project.id })
          .subscribe(
            (response) => {
              this.openSnackBar('Bewerbung gesendet!', 'success');
              this.router.navigate(['/project']);
            },
            (error) => {
              this.openSnackBar(
                'Fehler: Bewerbung senden fehlgeschlagen',
                'warn'
              );
            }
          );
      }
    });
  }

  openSnackBar(msg: string, clss: string): void {
    this.snackBar.open(msg, '', {
      panelClass: [clss],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        content:
          'Möchten Sie das Projekt wirklich verlassen?\nWenn Sie das Projekt als Letzter verlassen, wird es gelöscht!',
        buttonLabels: ['Verlassen', 'Zurück'],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 0) {
        this.addMember();
      }
    });
  }

  likeProject() {
    this.publicService.curUser().subscribe((response) => {
      this.user = response;
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.projectService
          .getProjectByIdUsingGET({ id })
          .subscribe((response) => {
            this.project = response;
            if (this.project.id && this.user.id) {
              this.interService
                .likeProject({ id: this.project.id, userId: this.user.id })
                .subscribe((response) => response);
              this.refreshService.reloadComponent();
            }
          });
      });
    });
  }

  checkProjectLike(): void {
    this.publicService.curUser().subscribe((response) => {
      this.user = response;
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.projectService
          .getProjectByIdUsingGET({ id })
          .subscribe((response) => {
            this.project = response;
            if (this.project.projectLikes!.includes(this.user.id!)) {
              this.isLiked = true;
            } else {
              this.isLiked = false;
            }
          });
      });
    });
  }

  sendChatMsg():void {
    this.publicService.curUser().subscribe((response) => {
      this.user = response;
      let newMessage = this.user.id! + '%%%' + this.chatMessage;
      this.project.chat!.push(newMessage);
      this.projectService.updateProjectUsingPUT({id: this.project.id!, project: this.project})
        .subscribe(response => {
          this.refreshService.reloadComponent();
        });
    })
  }

  changeProjectPhase(isPushToNext: boolean):void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService.pushPhase({id:id, pushToNext: isPushToNext}).subscribe(response => {
        this.openSnackBar('Projektphase erfolgreich geändert', 'success');
      },
      (error) => {this.openSnackBar("Projektphase konnte nicht geändert werden", 'warn')});
    });
  }
  
  acceptAcceptancePhase():void{
    this.publicService.curUser().subscribe(response => {
      this.user = response;
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.interService.userId({projectId: id, userId: this.user.id!}).subscribe(response => {
          this.openSnackBar('Acceptance-Phase wurde bestätigt', 'success');
        },
        (error) => {this.openSnackBar("Phase konnte nicht bestätigt werden", 'warn')})
      })
    })
  }
}
