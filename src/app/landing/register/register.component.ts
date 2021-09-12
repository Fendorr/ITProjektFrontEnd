import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user : UserDTO = {};
  constructor(private userService : UserService) { }
  ngOnInit() {
  
  }

  createUser() {
    console.log(this.user);
    this.userService.postUserUsingPOST({userDto:this.user}).subscribe(user => console.log(user))
  }

}
