import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss']
})
export class ManufactureComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }
  isArray(obj: any) {
    return Array.isArray(obj)
  }
}
