import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  user: UserDTO = {};

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Request-Header nach Login
    if (this.authenticationService.isLoggedIn) {
      //Header für Basic HTTP Authentication
      const headers = new HttpHeaders(this.user ? {
        authorization: 'Basic ' + sessionStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest'
      } : {});

      const loggedInReq = req.clone({ url: `http://localhost:8080${req.url}`, headers: headers });
      return next.handle(loggedInReq);
    }

    //Request-Header vor Login
    else{
      const headers = new HttpHeaders(this.user ? {
        'X-Requested-With': 'XMLHttpRequest'
      } : {});

      const apiReq = req.clone({ url: `http://localhost:8080${req.url}`, headers: headers });
      return next.handle(apiReq);
    }

  }
}