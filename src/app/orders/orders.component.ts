import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'util';
@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  OrdersData: any;
  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,

    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.getOrders()
  }

  getOrders() {
    let action = Action.AUTH + Action.ORDERS;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.OrdersData = data;
      }, error => {
      });
  }
  dateFormat(value) {
    return moment(value).format('YYYY-MM-DD');
  }

  onShowOrderDetails(order) {
    let modalRef = this.modalService.open(OrderDetailComponent, {
      windowClass: 'order-detail'
    });
    modalRef.componentInstance.orderID = order.id;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      modalRef.close()
    })
  }


}
