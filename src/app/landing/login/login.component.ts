import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { LoginDTO } from 'src/api/generated/defs/LoginDTO';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDto : LoginDTO = {};
  

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login(){
    this.authService.login(this.loginDto.email!, this.loginDto.password!);
  }
}
