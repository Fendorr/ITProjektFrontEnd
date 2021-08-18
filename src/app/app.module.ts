//* Modules and other Imports
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { APIInterceptor } from './Interceptor/api-interceptor';

//* Component Imports
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';

//* Angular Material Imports
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ //? Wenn man hier einen Componentnamen reinschreibt, passiert der Import meist von selbst.
    AppComponent,
    ExampleComponent,
  ],
  imports: [ //? Die Angular Materials gehören hier hin!
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
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
