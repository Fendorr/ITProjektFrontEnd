import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectService } from 'src/api/generated/controllers/Project';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIInterceptor } from './Interceptor/api-interceptor';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
    },
    ProjectService
],

  bootstrap: [AppComponent]
})
export class AppModule { }
