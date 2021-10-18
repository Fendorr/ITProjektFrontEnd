import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { LoginDTO } from 'src/api/generated/defs/LoginDTO';
import { UserDTO } from 'src/api/generated/defs/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: UserDTO = {};
  private loginDto: LoginDTO = {};
  private authenticated = false;
  private password: string;

  constructor(private publicService: PublicService, private router: Router) { }

  login(email: string, password: string) {
    this.publicService.login({loginDto:{email: this.loginDto.email, password: this.loginDto.password}}).subscribe
      (response => {
        this.authenticated = true;
        this.password = password; 
        this.user.email = email;
        this.router.navigateByUrl('/');
      },
        (error: HttpErrorResponse) => this.authenticated = false);
  }

  //zu login: loginDTO nutzen, aber im Rumpf erst parametrisieren
  //dann auch in register und login.component?
  //WICHTIG: Fabi Changes in register.component zeigen

  isLoggedIn() {
    return this.authenticated;
  }

  getCurrentUser() {
    return this.user;
  }

  getAuthenticationHeader() {
    this.password = this.loginDto.password!
    return btoa(this.user.email + ':' + this.password)  //TODO PASSWORT!
  }
}
