import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

import { AppService } from '../directive/app.service';
import { Action, AppConstants } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  //itemData = [
  //  { itemName: 'Ignacio Chairs', price: '39.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' },
  //  { itemName: 'Diamond Lamp', price: '23.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' },
  //  { itemName: 'High Table', price: '15.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' },
  //  { itemName: 'Pendant Shade', price: '20.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' },
  //  { itemName: 'Aslesha Basket', price: '27.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' },
  //  { itemName: 'Driva Table Lamp', price: '56.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' },
  //  { itemName: 'Hanging Sphere', price: '18.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' },
  //  { itemName: 'Portable Speaker', price: '42.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' }
  //]
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

  categoriesData: Array<any> = [];
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
    private spinnerService: Ng4LoadingSpinnerService
  ) 
  {
    //console.log('Get category object' + this.router.getCurrentNavigation().extras.state.category.id);
    this.route.paramMap.subscribe(
        params => {
        //console.log(params.get('id'))
        //if (params.categoryId == undefined) {
        //  this.categoryID = '';
        //} else {
        //  this.categoryID = params.categoryId;
       //}
      this.getProductList();
    })
  }

  ngOnInit() {
    this.getCategory();
  }
  getCategory() {
    let action = Action.CATEGORY;
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data);
        this.categoriesData = data;
      }, error => {
      });
  }
  getProductList() {
    this.spinnerService.show();
    let action = Action.PRODUCTS;
    let filter = '&category=' + this.categoryID;
    this.appService.getMethod(action + '?lang=en&start=' + this.skip + '&count=' + this.limit + '' + filter)
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
    this.getProductList()
  }
  addToCart(result) {
    this.spinnerService.show();
    let action = Action.CART;
    let param = { "product": result.id, "quantity": 1 }
    if (this.cookieService.get('shopizer-cart-id')) {

      let id = this.cookieService.get('shopizer-cart-id');
      this.appService.putMethod(action, id, param)
        .subscribe(data => {

        }, error => {
        });
      this.spinnerService.hide();
    } else {
      this.appService.postMethod(action, param)
        .subscribe(data => {
          console.log(data);
          this.cookieService.set('shopizer-cart-id', data.code)
        }, error => {
        });
      this.spinnerService.hide();
    }
  }
  goToDetailsPage(result) {
    this.router.navigate(['/product-detail'], { queryParams: { productId: result.id } });
    // this.router.navigate(['/product-detail'], { param: { productid: result.id } });
  }
  public ngOnDestroy() {
    localStorage.setItem('category_id', '')
  }
  onRefresh(value) {
    this.loadmore = true;
    this.skip = value;
    this.getProductList();
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
        this.spinnerService.hide();
      });

  }
}
