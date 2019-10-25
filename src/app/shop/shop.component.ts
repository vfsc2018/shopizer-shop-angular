import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

import { AppService } from '../directive/app.service';
import { Helper } from '../directive/helper';
import { Action, AppConstants } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DataSharingService } from '../directive/data-sharing.service';
@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  productData: Array<any> = [];
  showGrid: Boolean = false;
  show_product: any = 10;
  skip: any = 0;
  limit: any = 12;
  page: any = 1;
  totalRecord: Number = 0;
  sellerData: Array<any> = [
    { 'name': 'Crackle Plates', 'price': 22.99 },
    { 'name': 'floor lamp', 'price': 48.05 },
    { 'name': 'wooden fan', 'price': 25.54 }
  ];

  categoriesData: any;
  manufactureData: any;
  sizeData: Array<any> = [];
  colorData: Array<any> = [];
  minValue: number = 22;
  maxValue: number = 77;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1

  };
  categoryID: any = '';
  loadmore: boolean = false;
  constructor(
    private appService: AppService,
    private cookieService: CookieService,
    public router: Router,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private dataSharingService: DataSharingService,
    private Helper: Helper
  ) {
    this.dataSharingService.categoryData.subscribe(value => {
      // console.log(value, '123456789');
      this.productData = [];
      if (value == '') {
        if (localStorage.getItem('category_id') == '') {
          this.categoryID = '';
        } else {
          this.categoryID = JSON.parse(localStorage.getItem('category_id')).id;
        }
      } else {
        this.categoryID = value.id;
      }
      this.getProductList();
      this.getCategory();
    });

  }

  ngOnInit() {

  }
  getCategory() {
    let action = Action.CATEGORY + '?count=20&page=0'
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data);
        if (this.categoryID != '') {
          let index = data.categories.findIndex((value => value.id === this.categoryID))
          this.categoriesData = data.categories[index];
        } else {
          this.categoriesData = data.categories;
        }

      }, error => {
      });
    this.getManufacturers();
  }
  getManufacturers() {
    let action = Action.MANUFACTURERS + this.categoryID
    this.appService.getMethod(action)
      .subscribe(data => {
        console.log(data)
        this.manufactureData = data.manufacturers;
      }, error => {
        this.manufactureData = null;
      });
  }
  getProductList() {
    let language = localStorage.getItem('langulage');
    this.spinnerService.show();
    let action = Action.PRODUCTS;
    let filter = '&category=' + this.categoryID;
    // let manufacture = '&manufacturers=' + 500;
    this.appService.getMethod(action + '?lang=' + language + '&start=' + this.skip + '&count=' + this.limit + '' + filter)
      .subscribe(data => {
        this.totalRecord = data.totalCount;
        this.productData = this.productData.concat(data.products);
        this.spinnerService.hide();
        this.loadmore = false;
      }, error => {
        this.loadmore = false;
        this.spinnerService.hide();
      });
    if (this.categoryID) {
      this.getVariants();
    }
  }
  onHideShowGrid() {
    this.showGrid = !this.showGrid;
  }
  onFilter(result, status) {
    if (status == 0) {
      this.categoryID = result.id;
    }
    this.productData = [];
    this.dataSharingService.categoryData.next(result);
    // localStorage.setItem('category_id', JSON.stringify(result))
    // this.router.navigate(['/category/' + result.description.friendlyUrl]);
    // this.getProductList();
    // this.getCategory();
  }
  addToCart(result) {
    this.spinnerService.show();

    let userData = JSON.parse(localStorage.getItem('userData'));
    let action;
    // if (userData) {
    //   action = Action.CUSTOMERS + userData.id + '/' + Action.CARTS;
    // } else {
    //   action = Action.CART
    // }
    // let action = Action.CART;
    if (this.cookieService.get('shopizer-cart-id')) {
      action = Action.CART
      let cartData = JSON.parse(this.cookieService.get('localCart'));
      let index = cartData.findIndex(order => order.id === result.id);
      let param = { "product": result.id, "quantity": index == -1 ? 1 : cartData[index].quantity + 1 }
      let id = this.cookieService.get('shopizer-cart-id');
      this.appService.putMethod(action, id, param)
        .subscribe(data => {
          this.showMiniCart();
        }, error => {
        });
      this.spinnerService.hide();
    } else {
      if (userData) {
        action = Action.CUSTOMERS + userData.id + '/' + Action.CARTS;
      } else {
        action = Action.CART
      }
      let param = { "product": result.id, "quantity": 1 }
      this.appService.postMethod(action, param)
        .subscribe(data => {
          this.cookieService.set('shopizer-cart-id', data.code);
          this.showMiniCart();
        }, error => {
        });
      this.spinnerService.hide();
    }
  }
  showMiniCart() {
    this.Helper.showMiniCart(1);
  }
  goToDetailsPage(result) {
    this.router.navigate(['/product-detail'], { queryParams: { productId: result.id } });
    // this.router.navigate(['/product-detail'], { param: { productid: result.id } });
  }
  public ngOnDestroy() {
    this.dataSharingService.categoryData.next('');
    localStorage.setItem('category_id', '')
  }
  onRefresh(value) {
    if (this.productData.length != this.totalRecord) {
      this.loadmore = true;
      this.skip = value;
      this.getProductList();
    }
  }
  getVariants() {
    let action = Action.CATEGORY + this.categoryID + '/' + Action.VARIANTS
    this.appService.getMethod(action)
      .subscribe(data => {
        data.map(variant => {
          if (variant.name == 'Color') {
            this.colorData = variant.options;
          } else if (variant.name == "Size") {
            this.sizeData = variant.options;
          }
        });

        this.spinnerService.hide();
      }, error => {
        this.colorData = [];
        this.sizeData = [];
        this.spinnerService.hide();
      });

  }
  isArray(obj: any) {
    return Array.isArray(obj)
  }
}
