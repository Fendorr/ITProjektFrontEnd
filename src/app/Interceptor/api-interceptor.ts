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

    //Header für Basic HTTP Authentication
    const headers = new HttpHeaders(this.user ? {
      authorization: 'Basic ' + this.authenticationService.getAuthenticationHeader(),
      'X-Requested-With': 'XMLHttpRequest'
    } : {});

    const apiReq = req.clone({ url: `http://localhost:8080${req.url}`, headers: headers });
    return next.handle(apiReq);
  }
}