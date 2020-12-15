import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  OrdersData: any;
  api_url=environment.baseUrl;
  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,

    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.getOrders()
  }

  private formatMoney(amount:string) {
    let money = "";
    let i = 0;
    
    while(amount.length>0){
      if(i>0 && i%3==0) money = "," + money;
      let last = amount.substr(amount.length - 1); 
      money = last + money;
      amount = amount.substr(0,amount.length - 1); 
      i++;
    }
    return money;
  }

  public getCurrency(amount){
    let money = amount + "";
    return this.formatMoney(money);
  }

  getOrders() {
    let action = Action.PRIVATE + Action.CUSTOMER + Action.ORDERS;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.OrdersData = data;
      }, error => {
      });
  }
  dateFormat(value) {
    return value?moment(value).format('DD/MM/YYYY'):"";
  }

  onShowOrderDetails(order) {
    let modalRef = this.modalService.open(OrderDetailComponent, {
      windowClass: 'order-detail'
    });
    modalRef.componentInstance.orderID = order.id;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      modalRef.close()
    })
  }


}
