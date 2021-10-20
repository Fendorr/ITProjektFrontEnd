import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { LoginDTO } from 'src/api/generated/defs/LoginDTO';
import { UserDTO } from 'src/api/generated/defs/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: UserDTO = {};
  private authenticated = false;
  private emailForHeader: string;
  private passwordForHeader: string;

  constructor(private publicService: PublicService, private router: Router, private userService: UserService) { }

  login(email: string, password: string) {
    this.publicService.login({ loginDto: { email: email, password: password } }).subscribe
      (isValid => {
        if (isValid) {
          sessionStorage.setItem(
            'token',
            btoa(email + ':' + password)
          );
        
          this.authenticated = true;
          this.emailForHeader = email;
          this.passwordForHeader = password;

          this.router.navigate(['/']);
        } 
        else {
          this.authenticated = false;
          alert("Authentication failed.")
        }
      });
  }

  isLoggedIn() {
    return this.authenticated;
  }

  getCurrentUser() {
    return this.user;
  }

  getAuthenticationHeader(){
    return btoa(this.emailForHeader + ':' + this.passwordForHeader);
  }
}
