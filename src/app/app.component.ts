import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'bootstrapSwaggerGenExample';
  opened = false;
  userName = "Rainer" //Später dynamisch eingeloggten Nutzernamen 

  // constructor(private app: AppService, private http: HttpClient, private router: Router) {
  //   this.app.authenticate(undefined, undefined);
  // }
  // logout() {
  //   this.http.post('logout', {}).pipe(finalize(() => {
  //       this.app.authenticated = false;
  //       this.router.navigateByUrl('/login');
  //   })).subscribe();
  // }

  logout() { }

  ngOnInit() {
    //TODO ich bin mir nicht ganz sicher aber ich denke der Nutzername (userName) sollte hier gefetched werden...
  }
}
