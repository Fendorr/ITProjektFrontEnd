import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { LoginDTO } from 'src/api/generated/model';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Tag } from 'src/app/project/new-project/new-project.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RefreshService } from 'src/app/services/refreshComponent.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  loginDto: LoginDTO = {};
  user: UserDTO;
  show: boolean;
  public password: string;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];

  constructor(
    private refreshService: RefreshService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    private publicService: PublicService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProfileSettingsComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.publicService
      .curUser()
      .subscribe((response) => {(this.user = response)
        this.user.tags!.map(a => this.tags.push({ name: a }));
      });
    this.show = true;

    // this.route.params.forEach((params: Params) => {
    //   let id = +params['id'];
    //   this.userService.getUserByIdUsingGET({ id }).subscribe(response => this.user = response);
    // });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        content: 'Möchten Sie die Änderungen speichern?',
        buttonLabels: ['Speichern', 'Zurück'],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 0) {
        this.updateUser(this.user.id, this.user, this.password!);
        this.show = true;
      }
    });
  }

  openSnackBar(msg: string, clss: string): void {
    this.snackBar.open(msg, '', {
      panelClass: [clss],
    });
  }

  getUserAgain() {
     this.show = true;
     this.publicService.curUser().subscribe((response) => {
       this.user = response;
     });
  }

  updateUser(id: number | undefined, newUser: UserDTO, password: string): void {
    if (id) {
      newUser.tags = this.tags.map(a => a.name);
      this.userService
        .updateUserUsingPUT({ id: id, userDto: newUser, pw: this.password! })
        .subscribe(
          (response) => {
            this.openSnackBar('Daten erfolgreich geändert. Du wurdest aus Sicherheitsgründen ausgeloggt.', 'success');
            this.authService.logout(); //logout da sonst probleme bei 2mal email aendern
          },
          (error) => {
            this.openSnackBar(
              'Fehler: Daten konnten nicht geändert werden. Du wurdest aus Sicherheitsgründen ausgeloggt.',
              'warn'
            );
            this.authService.logout(); //logout da sonst probleme bei 2mal email aendern
          }
        );
        
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
