import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductDetailComponent implements OnInit {
  //@Input() productDetails: any[];



  productDetail: any;
  reletedProduct: Array<any> = [];
  auth: any;

  qty: any = 1;
  review = {
    description: '',
    rate: 0
  }
  // minValue: number = 22;
  // maxValue: number = 77;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1

  };

  currentJustify = 'center';
  customOptions: OwlOptions = {
    loop: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  productId: any;
  constructor(config: NgbRatingConfig, private route: ActivatedRoute, private appService: AppService, private cookieService: CookieService) {
    config.max = 5;
    // config.readonly = true;
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.productId = params.productId;
      this.auth = this.cookieService.get('auth');
      console.log(this.auth);
      // console.log(params.get("id"))
    })
  }

  ngOnInit() {
    this.getProductDetails()
  }
  getProductDetails() {
    let action = Action.PRODUCTS;

    this.appService.getMethod(action + this.productId + '?lang=en')
      .subscribe(data => {
        console.log(data);
        this.productDetail = data;

      }, error => {
      });
    this.getRelatedProduct()
  }
  getRelatedProduct() {
    let action = Action.PRODUCTS;

    this.appService.getMethod(action + this.productId + '/related')
      .subscribe(data => {
        console.log(data);
        this.productDetail = data;

      }, error => {
      });

  }
  handleChange(event, color, productID, option) {
    // console.log(event);
    let action = Action.PRODUCTS + productID + '/variant';
    let param = { "options": [{ "option": option.id, "value": color.id }] }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data);
        this.productDetail.finalPrice = data.finalPrice;
      }, error => {
      });
  }
  addToCart(product) {
    let action = Action.CART;
    let param = { "product": product.id, "quantity": this.qty, "attributes": [{ "id": 3 }] }
    if (this.cookieService.get('shopizer-cart-id')) {
      let id = this.cookieService.get('shopizer-cart-id');
      this.appService.putMethod(action, id, param)
        .subscribe(data => {

        }, error => {
        });
    } else {
      this.appService.postMethod(action, param)
        .subscribe(data => {
          console.log(data);
          this.cookieService.set('shopizer-cart-id', data.code)
        }, error => {
        });
    }
  }
  qtyUpdate(status) {
    if (status == 1) {
      this.qty = this.qty + 1;
    } else {
      if (this.qty > 0) {
        this.qty = this.qty - 1;
      }
    }
  }
  onSubmitReview(productID) {
    // let action = 'auth/' + Action.PRODUCTS + productID + '/reviews'
    // let param = { "customerId": '', "date": '2019-06-20', "description": this.review.description, 'language': 'en', 'productId': productID, 'rating': this.review.rate }
    // this.appService.postMethod('auth/' + action, param)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.cookieService.set('shopizer-cart-id', data.code)
    //   }, error => {
    //   });
  }

}
