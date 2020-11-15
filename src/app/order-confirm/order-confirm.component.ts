import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppService } from '../directive/app.service';

@Component({
  selector: 'order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public orderID;
  info: any = {};

  constructor(private appService: AppService) {
    this.appService.getMethod("information").subscribe(data => {       
      this.info = data;
    }, error => { });
  }

  ngOnInit() {
    
  }
  passBack() {
    this.passEntry.emit();
  }
}
