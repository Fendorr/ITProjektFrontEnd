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
  authenticated = false;

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
          this.router.navigate(['/project']);
        } 
        else {
          this.authenticated = false;
          this.router.navigate(['/']);
          alert("Authentication failed.")
        }
      });
  }

  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authenticated;
  }

  getLoggedInUser() {
    //this.publicService.curUser().subscribe(response => this.user = response) //TODO BACKEND BEREITSTELLEN
  }


}
