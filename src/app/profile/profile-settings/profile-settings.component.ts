import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { LoginDTO } from 'src/api/generated/model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  loginDto: LoginDTO = {}
  user : UserDTO = {};
  show : boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.show = true;
    this.user = this.authService.getLoggedInUser();
    console.log(this.user);
    console.log("hi test");
    // this.route.params.forEach((params: Params) => {
    //   let id = +params['id'];
    //   this.userService.getUserByIdUsingGET({ id }).subscribe(response => this.user = response);
    // });
    
  }
  getUserAgain() {
    this.show = true;
    this.user= this.authService.getLoggedInUser();
  }
  updateUser(id: number | undefined, newUser: UserDTO): void {
    alert("Änderungen gespeichert");
    if (id) { //wenn id undefined --> if = false
      this.userService.updateUserUsingPUT({ id: id, userDto: newUser }).subscribe(response => console.log(response))
    }
  }

}
