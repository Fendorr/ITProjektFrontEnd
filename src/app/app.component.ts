import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/api/generated/controllers/Project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'bootstrapSwaggerGenExample';
  opened = false;
  userName = "Rainer" //Später dynamisch eingeloggten Nutzernamen 

  //TODO diese methode ist nur ein dummy
  logoutUser() {
    alert("Hier sollte der Nutzer eigentlich ausgeloggt werden und ein redirect zur Homepage muss stattfinden -> leider bin ich SEEEHR faul ;^)")
  }

  ngOnInit() {
    //TODO ich bin mir nicht ganz sicher aber ich denke der Nutzername (userName) sollte hier gefetched werden...
  }
}
