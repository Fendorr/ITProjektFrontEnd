import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './landing/login/login.component';
import { RegisterComponent } from './landing/register/register.component';
import { LikedProjectsListComponent } from './liked-projects-list/liked-projects-list.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';
import { StartprojectComponent } from './project/start-project/start-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailEditComponent } from './project/project-detail/project-detail-edit/project-detail-edit.component';


const routes: Routes = [

  { path: '', component: ProjectsListComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'likes', component: LikedProjectsListComponent, canActivate: [AuthGuard] },
  
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],

    children: [
      { path: ':id', component: MyProfileComponent, canActivate: [AuthGuard] },
      { path: ':id/update', component: UpdateProfileComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'profilesettings', component: ProfileSettingsComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsListComponent },
  {
    path: 'project', component: ProjectComponent, 
    children: [
      { path: '', component: StartprojectComponent, canActivate: [AuthGuard] },
      { path: 'new', component: NewProjectComponent, canActivate: [AuthGuard] },
      { path: ':id/edit', component: ProjectDetailEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
