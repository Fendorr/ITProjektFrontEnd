import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { LoginDTO } from 'src/api/generated/defs/LoginDTO';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: UserDTO = {};
  loggedIn = false;

  constructor(private publicService: PublicService, private router: Router) { }

  login(email: string, password: string) {
    this.publicService.login({ loginDto: { email: email, password: password } }).subscribe
      (isValid => {
        if (isValid) {
          sessionStorage.setItem(
            'token',
            btoa(email + ':' + password)
          );
          
          this.loggedIn = true;
          this.router.navigate(['/project']);
        } 
        else {
          this.loggedIn = false;
          this.router.navigate(['/']);
          alert("Authentication failed.")
        }
      });
  }

  logout(){
    sessionStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  get isLoggedIn() {
    return this.loggedIn;
  }

  getLoggedInUser() {
    this.publicService.curUser().subscribe(response => this.user = response)
    return this.user;
  }
}
