import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Helper } from '../directive/helper';
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
  galleryImages: Array<any> = [];
  constructor(
    config: NgbRatingConfig,
    private route: ActivatedRoute,
    public router: Router,
    private appService: AppService,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
    private Helper: Helper
  ) {
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
    this.spinnerService.show();
    let action = Action.PRODUCTS;

    this.appService.getMethod(action + this.productId + '?lang=en')
      .subscribe(data => {
        data.images.map((image) => {
          this.galleryImages.push({ 'small': image.imageUrl, 'medium': image.imageUrl, 'big': image.imageUrl })
        })
        this.productDetail = data;
      }, error => {
        this.router.navigate(['/error']);
      });
    this.getRelatedProduct()
  }
  getRelatedProduct() {
    let action = Action.PRODUCTS;
    this.appService.getMethod(action + this.productId + '/related')
      .subscribe(data => {
        console.log(data);
        this.productDetail = data;
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
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
    this.spinnerService.show();
    let action = Action.CART;
    let param = { "product": product.id, "quantity": this.qty, "attributes": [{ "id": 3 }] }
    if (this.cookieService.get('shopizer-cart-id')) {
      let id = this.cookieService.get('shopizer-cart-id');
      this.appService.putMethod(action, id, param)
        .subscribe(data => {
          this.spinnerService.hide();
          this.Helper.showMiniCart(1);
        }, error => {
          this.spinnerService.hide();
        });
    } else {
      this.appService.postMethod(action, param)
        .subscribe(data => {
          console.log(data);
          this.cookieService.set('shopizer-cart-id', data.code);
          this.spinnerService.hide();
          this.Helper.showMiniCart(1);
        }, error => {
          this.spinnerService.hide();
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
