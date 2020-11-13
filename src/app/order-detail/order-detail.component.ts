import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { environment } from 'src/environments/environment';
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
  api_url=environment.baseUrl;
  constructor(
    private modalService: NgbModal,
    private appService: AppService,
    public router: Router
  ) {

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
  ngOnInit() {
    // consaole.log(this.data)
    this.getOrderDetails()
  }
  getOrderDetails() {
    let action = Action.PRIVATE + Action.CUSTOMER + Action.ORDERS + this.orderID;
    this.appService.getMethod(action).subscribe(data => {
        this.data = data;
      }, error => {
      });
  }
  dateFormat(value) {
    return moment(value).format('DD/MM/YYYY');
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
