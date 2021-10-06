import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login.component';
import { RegisterComponent } from './landing/register/register.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';
import { StartprojectComponent } from './project/start-project/start-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';


const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  { path: 'profile', component: ProfileComponent,
    children: [
      { path: 'update', component: UpdateProfileComponent},
      { path: ':id', component: MyProfileComponent},
    ]
  },

  { path: 'projects', component: ProjectsListComponent},
  { path: 'project', component: ProjectComponent,
    children: [
      { path: '', component: StartprojectComponent},
      { path: 'new', component: NewProjectComponent},
      { path: ':id', component: ProjectDetailComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
