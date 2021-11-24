import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UserDTO } from 'src/api/generated/model';
import { PublicService } from 'src/api/generated/controllers/Public';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  user: UserDTO;
  x: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public authService: AuthenticationService, 
    private publicService: PublicService,
    private router: Router
    ) { }

  // ngOnInit(): void {
  //   this.publicService.curUser().subscribe(response => {
  //     this.user = response
  //     this.x = this.user.id!;
  //     console.log(this.user);
  //   })

  // }

  logout() {
    this.authService.logout();
  }

  // getCurrProfile(){
  //   this.publicService.curUser().subscribe(response => {
  //     this.user = response
  //     this.router.navigate(['/profile/', this.user.id])
  //   })
  // }

  // getCurrProject(){
  //   this.publicService.curUser().subscribe(response => {
  //     this.user = response
  //     if(this.user.activeProject===null){
  //       this.router.navigate(['/project/'])
  //     } else {
  //       this.router.navigate(['/project/', this.user.activeProject])
  //     }
  //   })
  // }

}
