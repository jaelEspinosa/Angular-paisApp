import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    input{
      background:rgb(228, 220, 220);
      border: 1xp solid white;
    }

  `
  ]
})
export class PorPaisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
