//* Modules and other Imports
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { APIInterceptor } from './Interceptor/api-interceptor';
import { FormsModule } from '@angular/forms';

//* Component Imports
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { ProjectComponent } from './project/project.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { TestComponent } from './test/test.component';
import { StartprojectComponent } from './project/start-project/start-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { MaterialModule } from './material.module';
import { ProjectsListItemComponent } from './projects-list/projects-list-item/projects-list-item.component';
import { ProjectListService } from './projects-list/projectlist.service';

@NgModule({
  declarations: [ //? Wenn man hier einen Componentnamen reinschreibt, passiert der Import meist von selbst.
    AppComponent,
    ExampleComponent,
    ProjectComponent,
    NewProjectComponent,
    TestComponent,
    StartprojectComponent,
    ProjectsListComponent,
    ProjectsListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
    },
    ProjectService,
    ProjectListService
],

  bootstrap: [AppComponent]
})
export class AppModule { }
