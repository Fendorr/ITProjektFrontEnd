import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { LoginDTO } from 'src/api/generated/model';

export enum TypeUserDTOEnum{
  Student = "Student",
  Professor = "Professor",
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  user : UserDTO = {};
  loginDto: LoginDTO = {};
  public password: string

  keys: any[]
  types = TypeUserDTOEnum
  

  constructor(private publicService : PublicService, private router: Router, private snackBar: MatSnackBar) { 
    this.keys = Object.keys(this.types);
  }

  ngOnInit(): void {
  
  }

  openSnackBar(msg: string, clss: string): void {
    this.snackBar.open(msg, '',{
      panelClass: [clss]
    });
  }

  createUser(): void {
    console.log(this.user);
    this.user.likedProjects = [];
    this.user.projectInvites = [];
    this.user.sentApplications = [];
    this.publicService.user({userDto:this.user, pw: this.password}).subscribe(user => {
      this.openSnackBar("User erfolgreich erstellt", 'success');
      this.router.navigate(['/login']),
      console.log(user)
    },
    (error) => {this.openSnackBar("Fehler: User konnte nicht erstellt werden", 'warn')});
  }

}
