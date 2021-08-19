import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit {

  constructor() { }

  onBadussy() {
    alert("Hurensohn, wer drückt -.-!");
  }

  ngOnInit(): void {
  }

}
