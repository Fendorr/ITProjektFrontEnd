import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  opened = false;
  isLoggedIn: Boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout();
   }
}

