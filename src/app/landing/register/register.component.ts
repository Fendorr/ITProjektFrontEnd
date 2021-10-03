import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';

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
  keys: any[]
  types = Type

  constructor(private userService : UserService) { 
    this.keys = Object.keys(this.types);
  }

  ngOnInit(): void {
  
  }

  createUser(): void {
    console.log(this.user);
    this.userService.postUserUsingPOST({userDto:this.user}).subscribe(user => console.log(user))
  }

}
