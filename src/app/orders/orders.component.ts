import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  password = {
    current: '',
    new: '',
    repeat: ''
  }
  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,

    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  onShowOrderDetails(content) {
    let modalRef = this.modalService.open(OrderDetailComponent, {
      windowClass: 'order-detail'
    });
  }


}
