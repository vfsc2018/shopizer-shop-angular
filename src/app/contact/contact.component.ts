import { Component, OnInit } from '@angular/core';
import { } from '@angular/core';


@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = 40.730610;
  lng: number = -73.935242;
  zoom: number = 15;

  constructor() { }

  ngOnInit() { }

}

