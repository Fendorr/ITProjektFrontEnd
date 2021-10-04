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
import { ProjectComponent } from './project/project.component';
import { StartprojectComponent } from './project/start-project/start-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';


//TODO Kenne bisher nur das Routing über eigene "...routing.ts"-files sollte aber identisch sein, daher:
//TODO Diese Routes müssen wsl erstellt werden -> die benennung der Components könnte so aussehen wie unten
//TODO Für die /project und /user routes werden wir children routes brauchen, zB /new_project um ein neues Project zu erstellen
//TODO zusätzlich hätte ich gedacht es macht sinn, wenn der user KEIN aktives proj hat, kommt er auf eine "home" seite..
//TODO mit zwei großen buttons: "Projekt finden" und "Projekt erstellen" auf die jeweiligen seiten können wir dann routen

// const routes: Routes = [
//   { path: '', component: AppComponent},
//   { path: 'projects' /*component: ProjectsListComponent */},
//   { path: 'project',
//     component: ProjectComponent,
//     children: [
//       { path: '', redirectTo: '/home', pathMatch: 'full' },
//       { path: 'new', component: NewProjectComponent},
//       { path: ':project_id', /* component: ProjectComponent */},
//       { path: ':project_id/edit', /* component: EditProjectComponent */},
//     ]
//   },
//   { path: '/user', /*component: UserProfileComponent, children: USER_ROUTES */}
// ];

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
