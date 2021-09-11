import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startproject',
  templateUrl: './start-project.component.html',
  styles: [`

      $primary: #3F51B5;
      $accent: #FF4081;

      .flex-container{
        margin: 60px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }

      @media (max-width: 570px) {
        .flex-container {
          flex-direction: column;
          align-items: center;
        }

        .show-div:first-of-type {
          margin-bottom: 20px;
        }
      }

      .show-div {
        height: 250px;
        width: 45%;
        min-width: 250px;
        padding: 0 20px;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #fff;
      };
      
      .primary {
        background-color: $primary;
      };

      .primary:hover {
        box-shadow: 0 0 20px 1px $primary;
        background-color: #fff;

        h3 {
          color: $primary;
          text-decoration: underline;
        }
      };
      
      .accent {
        background-color: $accent;
      };
      
      .accent:hover {
        box-shadow: 0 0 20px 1px $accent;
        background-color: #fff;

        h3 {
          color: $accent;
          text-decoration: underline;
        }
      };
      `]
})
export class StartprojectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
