import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { Router } from '@angular/router';
@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @Input() public orderID;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  data: any;
  constructor(
    private modalService: NgbModal,
    private appService: AppService,
    public router: Router
  ) {

  }

  ngOnInit() {
    // consaole.log(this.data)
    this.getOrderDetails()
  }
  getOrderDetails() {
    let action = Action.AUTH + Action.ORDERS + this.orderID;
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data);
        this.data = data;
      }, error => {
      });
  }
  dateFormat(value) {
    return moment(value).format('YYYY-MM-DD');
  }
  passBack() {
    this.passEntry.emit();
  }
  reorder(result) {
    console.log(result);
    this.router.navigate(['/product-detail'], { queryParams: { productId: result.product.id } });
    this.passBack()
  }

}
