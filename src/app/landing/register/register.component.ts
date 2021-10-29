import { Component, OnInit } from '@angular/core';
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
  

  constructor(private publicService : PublicService, private router: Router) { 
    this.keys = Object.keys(this.types);
  }

  ngOnInit(): void {
  
  }

  createUser(): void {
    console.log(this.user);
    this.user.likedProjects = [];
    this.user.projectInvites = [];
    this.user.sentApplications = [];
    this.publicService.user({userDto:this.user, pw: this.password}).subscribe(user => {
      this.router.navigate(['/login']),
      console.log(user)
    })
  }

}
