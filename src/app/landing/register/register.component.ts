import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { LoginDTO } from 'src/api/generated/model';

export enum Type{
  Student = "Student",
  Professor = "Professor"
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  user : UserDTO = {};
  loginDto: LoginDTO = {};
  keys: any[]
  types = Type
  public password: string

  constructor(private publicService : PublicService) { 
    this.keys = Object.keys(this.types);
  }

  ngOnInit(): void {
  
  }

  createUser(): void {
    console.log(this.user);
    this.publicService.user({userDto:this.user, pw: this.password}).subscribe(user => console.log(user))
  }

}
