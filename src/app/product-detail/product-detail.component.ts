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
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductDetailComponent implements OnInit {
  //@Input() productDetails: any[];


  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: false,
    // limitTo: 5,
    height: '135px',
  };
  api_url=environment.baseUrl;
  productDetail: any;
  reletedProduct: Array<any> = [];
  reviews: Array<any> = [];
  auth: any;
  selectedSize: any;
  selectedColor: any;
  selectedSizeID: any;
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
    private helper: Helper,
    private toastr: ToastrService,
  ) {
    config.max = 5;
    // config.readonly = true;
    this.route.queryParams.subscribe(params => {
      this.productId = params.productId;

      let userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        this.auth = true
      } else {
        this.auth = false
      }
      // this.auth = this.cookieService.get('auth');
      // console.log(this.auth);
      // console.log(params.get("id"))
    })
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
    this.getProductDetails()
  }
  goToDetailsPage(result) { 
    
    this.router.navigate(['/product-detail'], { queryParams: { productId: result.id, token: new Date().getTime() } });
   
  }
  getProductDetails() {
    this.spinnerService.show();
    let action = Action.PRODUCTS;

    this.appService.getMethod(action + this.productId).subscribe(data => { 
        data.showDateAvailable = this.helper.checkDateAvailable(data.dateAvailable);
        this.productDetail = data;
        if(data.images){
          data.images.map((image) => {
            this.galleryImages.push({ 'small': this.api_url+ image.imageUrl, 'medium': this.api_url+image.imageUrl, 'big': this.api_url+ image.imageUrl })
          })
        }
        if(data.options)
        {
          data.options.map((value) => {
            if (value.code == 'SIZE') {
              value.optionValues.map((size) => {
                if (size.defaultValue) {
                  // console.log(size)
                  this.selectedSize = size.name;
                  this.selectedSizeID = size.id;
  
                }
              })
            } else if (value.code == 'COLOR') {
              value.optionValues.map((size) => {
                if (size.defaultValue) {
                  // console.log(size)
                  this.selectedColor = size.id;
  
                }
              })
            }
          });
        }      
        

      }, error => {
        // this.router.navigate(['/error']);
      });
    this.getRelatedProduct()
    this.getReview();
  }
  onChangeSize(event) {
    this.selectedSize = event.value.name
    this.selectedSizeID = event.value.id
  }
  getRelatedProduct() {
    let action = Action.PRODUCTS;
    this.appService.getMethod(action + this.productId + '/related')
      .subscribe(data => {
        if(data){
          data.map(e=>{ 
              if(e.image) e.image.imageUrl=this.api_url+ e.image.imageUrl;   
          });
        }
        this.reletedProduct = data;
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
      });

  }
  handleChange(event, color, productID, option) {
    // console.log(event);
    this.selectedColor = color.id
    let action = Action.PRODUCTS + productID + '/variant';
    let param = { "options": [{ "option": option.id, "value": color.id }] }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        // console.log(data);
        this.productDetail.finalPrice = data.finalPrice;
      }, error => {
      });
  }
  // addToCart(product: any, quantity: number = 1) {
  //   this.spinnerService.show();
  //   let userData = JSON.parse(localStorage.getItem('userData')); 
  //   if(!quantity) quantity = 1;
  //   let action = Action.CART;
  //   // let param = {
  //   //   "product": product.id,
  //   //   "quantity": this.qty,
  //   //   "attributes": [
  //   //     { "id": this.selectedColor },
  //   //     { "id": this.selectedSizeID }
  //   //   ],

  //   // }
  //   if (this.cookieService.get('vfscfood-cart-id')) {
      
  //     let cartData = JSON.parse(this.cookieService.get('localCart'));      
  //     let index = cartData.findIndex(order => order.id === product.id); 
  //     let realQuantity =  quantity + (index == -1 ? 0 : cartData[index].quantity);
  //     let param = { "product": product.id, "quantity": realQuantity };
  //     let id = this.cookieService.get('vfscfood-cart-id'); 
  //     this.appService.put(action, id, param)
  //       .subscribe(data => {
  //         let index = data.products.findIndex(p => p.id === product.id); 
  //         this.qty = (index == -1 ? 0 : data.products[index].quantity);
  //         // this.qty = data.quantity; 
  //         this.spinnerService.hide();
  //         this.Helper.showMiniCart(1);
  //       }, error => {
  //         this.spinnerService.hide();
  //         this.toastr.error('Can not action this product','Product not avaiable');
  //       });
      
  //   } else if (userData) {
  //     action =  Action.PRIVATE + Action.CUSTOMER + Action.CARTS;
    
  //     let param = { "product": product.id, "quantity": quantity }     
    
  //     this.appService.postMethod(action, param)
  //       .subscribe(data => { 
  //         let index = data.products.findIndex(p => p.id === product.id); 
  //         this.qty = (index == -1 ? 0 : data.products[index].quantity);
  //         // this.qty = data.quantity;  
  //         this.cookieService.set('vfscfood-cart-id', data.code);
  //         this.spinnerService.hide();
  //         this.Helper.showMiniCart(1);
  //       }, error => {
  //         this.spinnerService.hide();
  //       });
  //   } else {
  //     this.spinnerService.hide();
  //   }
  // }
  showMiniCart() {
    this.helper.showMiniCart(1);
  }
  addToCart(result: any, quantity: number = 1) {
    this.spinnerService.show();
    let action;
    let id = this.cookieService.get('vfscfood-cart-id');  console.log("cart code product:", id);
    if (id) {
      action = Action.CART
      let cartData = JSON.parse(this.cookieService.get('localCart'));
      let index = cartData.findIndex(order => order.id === result.id);
      let realQuantity =  quantity + (index == -1 ? 0 : cartData[index].quantity);
      let param = { "product": result.id, "quantity": realQuantity }
      
      this.appService.put(action, id, param).subscribe(data => {
          if(data && data.products){
            let index = data.products.findIndex(p => p.id === result.id); 
            this.qty = (index == -1 ? 0 : data.products[index].quantity);
          }else{
            this.helper.resetCart();
            // this.cookieService.delete('vfscfood-cart-id')
          }
          this.showMiniCart();
          this.spinnerService.hide();
        }, error => {
          this.spinnerService.hide();
          this.toastr.error('Can not action this product','Product not avaiable');
        });

    } else if(quantity>0){
      let userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        action =  Action.PRIVATE + Action.CUSTOMER + Action.CARTS;
      } else {
        action = Action.CART
      }
      let param = { "product": result.id, "quantity": quantity }
      this.appService.postMethod(action, param).subscribe(data => {
          let index = data.products.findIndex(p => p.id === result.id); 
          this.qty = (index == -1 ? 0 : data.products[index].quantity);
          this.cookieService.set('vfscfood-cart-id', data.code);
          this.spinnerService.hide();
          this.showMiniCart();
        }, error => {
          this.spinnerService.hide();
        });
    }
  }
  qtyUpdate(status) {
    if (status == 1) {
      // this.qty = this.qty + 1;
      this.addToCart(this.productDetail, 1);
    } else {
      if (this.qty > 0) {
        // this.qty = this.qty - 1;
        this.addToCart(this.productDetail, -1);
      }
    }
  }
  getReview() {
    let action = Action.PRODUCTS + this.productId + '/reviews';
    this.appService.getMethod(action)
      .subscribe(data => {
      //  console.log(data);
        this.reviews = data;
      }, error => {
        this.spinnerService.hide();
      });
  }
  ratingComponentClick(clickObj: any): void {
    this.review.rate = clickObj.rating;

  }
  onSubmitReview(productID) {
    this.spinnerService.show();
    let language = localStorage.getItem('langulage');
    let userData = JSON.parse(localStorage.getItem('userData'));
    let action = Action.PRIVATE + Action.PRODUCTS + productID + '/reviews'
    let param = { "customerId": userData.id, "date": moment().format('DD/MM/YYYY'), "description": this.review.description, 'language': language, 'productId': productID, 'rating': this.review.rate }
    // console.log(action);
    // console.log(param);
    this.appService.postMethod(action, param)
      .subscribe(data => {
        this.toastr.success('Your review has been posted', 'Well done!');
        this.review = {
          description: '',
          rate: 0
        }
        this.spinnerService.hide();
        this.getReview()
      }, error => {
        this.review = {
          description: '',
          rate: 0
        }
        this.spinnerService.hide();
        this.toastr.error("A review already exist for this customer and product", "")
      });
  }


}
