//* Modules and other Imports
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { APIInterceptor } from './Interceptor/api-interceptor';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';

//* Component Imports
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { StartprojectComponent } from './project/start-project/start-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { MaterialModule } from './material.module';
import { ProjectsListItemComponent } from './projects-list/projects-list-item/projects-list-item.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login.component';
import { RegisterComponent } from './landing/register/register.component';
import { UserService } from 'src/api/generated/controllers/User';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { MyProfileComponent } from'./profile/my-profile/my-profile.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { CarouselItemComponent } from './project/project-detail/carousel-item/carousel-item.component';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';

import { LikedProjectsListComponent } from './liked-projects-list/liked-projects-list.component';
import { LikedProjectsItemComponent } from './liked-projects-list/liked-projects-item/liked-projects-item.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';

import { AuthGuard } from './services/auth.guard';
import { PublicService } from 'src/api/generated/controllers/Public';
import { InteractionService } from 'src/api/generated/controllers/Interaction';
import { MemberCardComponent } from './project/project-detail/member-card/member-card.component';
import { LikeUserComponent } from './project/project-detail/like-user/like-user.component';
import { InvitationCarouselItemComponent } from './project/start-project/invitation-carousel-item/invitation-carousel-item.component';
import { ApplicationCarouselItemComponent } from './project/start-project/application-carousel-item/application-carousel-item.component';
import { RefreshService } from './services/refreshComponent.service';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectDetailEditComponent } from './project/project-detail/project-detail-edit/project-detail-edit.component';

@NgModule({
  declarations: [			 
    AppComponent,
    ProjectComponent,
    NewProjectComponent,
    StartprojectComponent,
    ProjectsListComponent,
    ProjectsListItemComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MyProfileComponent,
    ProfileSettingsComponent,
    UpdateProfileComponent,
    ProjectDetailComponent,
    CarouselItemComponent,
    LikedProjectsListComponent,
    LikedProjectsItemComponent,
    MainNavComponent,
    MemberCardComponent,
    LikeUserComponent,
    InvitationCarouselItemComponent,
    ApplicationCarouselItemComponent,
    DialogComponent,
    ProjectDetailEditComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      },
    },
    ProjectService,
    UserService,
    PublicService,
    InteractionService,
    RefreshService,
    AuthGuard,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue:{}
    }
    
],

  bootstrap: [AppComponent]
})
export class AppModule { }
