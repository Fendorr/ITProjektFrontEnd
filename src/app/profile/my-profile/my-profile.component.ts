import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { LoginDTO } from 'src/api/generated/defs/LoginDTO';
import { UserDTO } from 'src/api/generated/defs/UserDTO';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  loginDto: LoginDTO = {}
  user: UserDTO = {};
  loggedinUser: UserDTO = {};
  public isLoggedinUser: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.publicService.curUser().subscribe(response => {
      this.loggedinUser = response;
      let id = Number(this.route.snapshot.paramMap.get('id'));
      this.userService.getUserByIdUsingGET({ id }).subscribe(response => {
        this.user = response;
        this.isLoggedinUser = this.loggedinUser.id === id;
      })
    })
  }
}
