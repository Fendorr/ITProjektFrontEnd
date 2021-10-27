import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { LoginDTO } from 'src/api/generated/model';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  loginDto: LoginDTO = {}
  user: UserDTO;
  show: boolean;
  password: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private publicService: PublicService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProfileSettingsComponent>
  ) { }

  ngOnInit(): void {
    this.publicService.curUser().subscribe(response => this.user = response)
    console.log("hallo" + this.user);
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
        buttonLabels: ['Speichern', 'Zurück']
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==0){
        this.updateUser(this.user.id, this.user, this.password)
        this.show = true;}
      
    });
  }

  getUserAgain() {
    this.show = true;
    this.publicService.curUser().subscribe(response => {
      this.user = response
      console.log("hallo again id:" + this.user.id + " " + this.user)
    });

  }


  updateUser(id: number | undefined, newUser: UserDTO, password: string): void {

    if (id) {
      //wenn id undefined --> if = false
      this.userService.updateUserUsingPUT({ id: id, userDto: newUser, pw: this.password }).subscribe(response => console.log(response))
      alert("Änderungen gespeichert");
    }
  }

}
