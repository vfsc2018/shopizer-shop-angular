import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

import { AppService } from '../directive/app.service';
import { Helper } from '../directive/helper';
import { Action } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DataSharingService } from '../directive/data-sharing.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  api_url=environment.baseUrl;
  products: Array<any> = [];
  productData: Array<any> = [];
  showGrid: Boolean = false;
  show_product: any = 12;
  skip: any = 0;
  limit: any = 12;
  page: any = 0;
  totalRecord: Number = 0;

  categoriesData: any;
  manufactureData: any;
  sizeData: Array<any> = [];
  colorData: Array<any> = [];
  minValue: number = 0;
  maxValue: number = 500;
  options: Options = {
    floor: 0,
    ceil: 1000,
    step: 50
  };
  min: number = this.minValue;
  max: number = this.maxValue;

  categoryID: any = '';
  loadmore: boolean = false;
  constructor(
    private appService: AppService,
    private cookieService: CookieService,
    public router: Router,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private dataSharingService: DataSharingService,
    private helper: Helper
  ) {
    
    let path = window.location.hash.split('/');
    if(!this.categoryID && path.length==3 && path[1]=='category'){
          this.getCategoryByPath(path[2]);
    }else{
      this.getDefaultProducts();
    }
    // if (localStorage.getItem('category_id')!='') {
    //   this.categoryID = JSON.parse(localStorage.getItem('category_id')).id;
    //   console.log("---1.0---", this.categoryID);
    //     this.getProductList();
    //     this.getCategory();
    // }else{
    //   console.log("---2.0---", this.categoryID);
    //     this.getProductList();
    //     this.getCategory();
    // }
    // this.dataSharingService.categoryData.subscribe(value => {
      // console.log(value, '<--->', this.categoryID);
      // this.productData = [];
      // if (value && value.id) {
      //   this.categoryID = value.id;
      
      
      // }
      
    // });
  }
  getDefaultProducts(){
    this.dataSharingService.category.subscribe(value => { 
      this.categoryID = value; 
      this.getProductList();
      this.getCategory();
    });
  }
  ngOnInit() {

  }
  getCategoryByPath(friendlyUrl: string) {
    let action = Action.CATEGORY + '?count=20&page=0'
    this.appService.getMethod(action).subscribe(data => {
        if(data.categories && data.categories[0] && data.categories[0].children){
          let i = data.categories[0].children.findIndex((value => value.description.friendlyUrl === friendlyUrl));
          if(i>=0){
            this.categoryID = data.categories[0].children[i].id;
            this.getProductList();
            this.getCategory();
          }else{
            this.getDefaultProducts();
          }
        }
    }, error => {
    });
    this.getManufacturers();
  }
  getCategory() {
    let action = Action.CATEGORY + '?count=20&page=0'
    this.appService.getMethod(action).subscribe(data => {
      if (this.categoryID && this.categoryID != '') {
        let i = data.categories.findIndex((value => value.id === this.categoryID));
        this.categoriesData = data.categories[i];
      } else {
        this.categoriesData = data.categories;
      }
    }, error => {
    });
    
    this.getManufacturers();
  }
  getManufacturers() {
    let action = Action.MANUFACTURERS;
    if (this.categoryID && this.categoryID != '') {
      action =  Action.CATEGORY + this.categoryID + "/" + Action.MANUFACTURERS;
    }else{
      this.appService.getMethod(action).subscribe(data => {
        this.manufactureData = data.manufacturers;
      }, error => {
        this.manufactureData = null;
      });
    }
  }
  getProductList(reset: boolean = true) {
    this.products = [];
    if(reset) this.productData = [];
    let language = localStorage.getItem('langulage');
    this.spinnerService.show();
    let action = Action.PRODUCTS;
    let filter = '&category=' + this.categoryID;
    // let manufacture = '&manufacturers=' + 500;
    this.appService.getMethod(action + '?lang=' + language + '&start=' + this.skip + '&count=' + this.limit + '' + filter)
      .subscribe(data => { 
        this.totalRecord = data.recordsTotal;
        this.productData = this.productData.concat(data.products); 
        this.show_product = this.productData.length;

        this.productData.map(e=>{
          e.showDateAvailable = this.helper.checkDateAvailable(e.dateAvailable);
          if(e.image && e.image.imageUrl.indexOf("http")<0)
          {
            e.image.imageUrl=this.api_url+ e.image.imageUrl;
            e.images.map(ex=>{
              if(ex.imageUrl.indexOf("http")<0)
              {
                ex.imageUrl=this.api_url+ ex.imageUrl;
              }     
            });
          }     
        });
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
      if(result.id && result.id>0){
        this.dataSharingService.category.next(result.id);
      }
      this.dataSharingService.categoryData.next(result);
      localStorage.setItem('category_id', JSON.stringify(result))
      this.router.navigate(['/category/' + result.description.friendlyUrl]);
      this.getCategory();
      this.getProductList();
    }
  }
  onPriceFilter() {
      if(!this.products.length){
        this.products = this.productData;
      }
      this.productData = this.products.filter((data) => {
        return data.price>=this.minValue*1000 && data.price<=this.maxValue*1000;
      });
  }
  addToCart(result) {
    this.spinnerService.show();

    let action;
    let id = this.cookieService.get('vfscfood-cart-id'); 
    if (id) {
      action = Action.CART
      let cartData = JSON.parse(this.cookieService.get('localCart'));
      let index = cartData.findIndex(order => order.id === result.id);
      let param = { "product": result.id, "quantity": index == -1 ? 1 : cartData[index].quantity + 1 }
     
      this.appService.put(action, id, param)
        .subscribe(data => {
          this.showMiniCart();
          this.spinnerService.hide();
        }, error => {
          this.spinnerService.hide();
          this.toastr.error('Can not action this product','Product not avaiable');
        });
    } else {
      let userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        action =  Action.PRIVATE + Action.CUSTOMER + Action.CARTS;
      } else {
        action = Action.CART
      }
        let param = { "product": result.id, "quantity": 1 }
      this.appService.postMethod(action, param).subscribe(data => {
          this.cookieService.set('vfscfood-cart-id', data.code);
          this.showMiniCart();
        }, error => {
        });
      this.spinnerService.hide();
    }
  }
  showMiniCart() {
    this.helper.showMiniCart(1);
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
      this.getProductList(false);
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
