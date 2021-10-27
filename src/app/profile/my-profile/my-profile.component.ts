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
  user : UserDTO = {};
  
  constructor(
    private userService : UserService,
    private route: ActivatedRoute,
    private publicService: PublicService
    ) {}

  ngOnInit(): void {
    this.publicService.curUser().subscribe(response => this.user = response)
    // this.route.params.forEach((params: Params) => {
    //   let id = +params['id'];
    // this.userService.getUserByIdUsingGET({id}).subscribe(response => this.user = response);
    // });
  }

}
