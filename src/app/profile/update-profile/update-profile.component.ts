import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  user : UserDTO = {};
  
  constructor(
    private userService : UserService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
    this.userService.getUserByIdUsingGET({id}).subscribe(response => this.user = response);
    });
  }

  updateUser(id: number | undefined, newUser : UserDTO): void {
    console.log(this.user);
    if (id){ //wenn id undefined --> if = false
      this.userService.updateUserUsingPUT({id: id,user: newUser}).subscribe(response => console.log(response))
    }
  }
}
