import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  passBack() {
    this.passEntry.emit();
  }
}
