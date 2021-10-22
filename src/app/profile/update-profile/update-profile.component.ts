import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/api/generated/controllers/User';
import { LoginDTO } from 'src/api/generated/defs/LoginDTO';
import { UserDTO } from 'src/api/generated/defs/UserDTO';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  loginDto: LoginDTO = {}
  user: UserDTO = {}

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.userService.getUserByIdUsingGET({ id }).subscribe(response => {
        this.user = response;
        console.log(this.user);
      });
    });
  }

  updateUser(id: number | undefined, newUser: UserDTO): void {
    console.log(newUser);
    // if (id) { //wenn id undefined --> if = false
    //   this.userService.updateUserUsingPUT({ id: id, user: newUser }).subscribe(response => console.log(response))
    // }
  }
}
