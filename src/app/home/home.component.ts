import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Helper } from '../directive/helper';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  api_url=environment.baseUrl;
  // @ViewChild("CartComponent") CartComponent: CartComponent;
  constructor(
    private titleService: Title,
    private appService: AppService,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
    private Helper: Helper,
    public router: Router,
    private toastr: ToastrService
  ) { }
  productData: Array<any> = [];
  filterData: Array<any> = [];
  categoryData: Array<any> = [];
  public loading = false;
  isOpen: boolean;
  //sliderItems: Array<any> = [];
  sliderItems: Array<any> = [
    //    {
    //    title: "Shopping",
    //    description: "VfSC shop banner 1",
    //    img: "http://14.160.32.79:8081/static/files/DEFAULT/IMAGE/banner1.jpg"
    //  },
    //  {
    //    title: "Buying",
    //    description: "VfSC shop banner 2",
    //    img: "http://14.160.32.79:8081/static/files/DEFAULT/IMAGE/banner2.jpg"
    //  },
    //  {
    //   title: "Happy",
    //   description: "VfSC shop banner 3",
    //   img: "http://14.160.32.79:8081/static/files/DEFAULT/IMAGE/banner3.jpg"
    // }
   ];
  ngOnInit() {
    this.getProductList()
    this.ContentImage()
    this.titleService.setTitle('VFSC food shop');
  }
  getProductList() {
    let action = Action.PRODUCT_GROUP;
    this.appService.getMethod(action + 'FEATURED_ITEM')
      .subscribe(data => {
        // console.log(data.products);
        // data.products.map(item => {
        //   item.categories.map(category => {
        //     // console.log(category)
        //     let index = this.categoryData.findIndex(value => value.id == category.id);
        //     if (index == -1) {
        //       this.categoryData.push({ 'id': category.description.id, 'name': category.description.name })
        //     }
        //   })
        // });
        // console.log(data.products)
    
        this.productData = data.products;
        this.productData.map(e=>{
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
        this.filterData = this.productData;
      }, error => {
      });
  }
  ContentImage() {
    let action = Action.CONTENT + Action.IMAGES;
    this.appService.getMethod(action).subscribe(data => { 
          this.sliderItems = [];
          data.content.map(e=>{
            if(e.name.indexOf("banner")==0)
            {
              let title = 'VfSC food shop';
              let description = 'Shooping online';
              let img = this.api_url+ e.path + e.name;
              this.sliderItems.push({title, description, img})
            }     
          });
      }, error => { });
  }
  addCart(result) {
    this.spinnerService.show();
    let action;

    if (this.cookieService.get('shopizer-cart-id')) {
      action = Action.CART
      let cartData = JSON.parse(this.cookieService.get('localCart'));
      let index = cartData.findIndex(order => order.id === result.id);
      let param = { "product": result.id, "quantity": index == -1 ? 1 : cartData[index].quantity + 1 }
      let id = this.cookieService.get('shopizer-cart-id');
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
      this.appService.postMethod(action, param)
        .subscribe(data => {
          // console.log(data);
          this.cookieService.set('shopizer-cart-id', data.code);
          this.spinnerService.hide();
          this.showMiniCart();
        }, error => {
          this.spinnerService.hide();
        });
    }


  }
  showMiniCart() {
    this.Helper.showMiniCart(1);
  }
  goToDetailsPage(result) {
    this.router.navigate(['/product-detail'], { queryParams: { productId: result.id } });
    // this.router.navigate(['/product-detail'], { param: { productid: result.id } });
  }

  filterFeaturedItem(val) {
    if (val != '') {
      this.filterData = [];
      this.productData.map(item => {
        item.categories.map(category => {
          // console.log(category)
          if (val.id == category.description.id) {
            // console.log(item)
            this.filterData.push(item)
          }
        })
      });

    } else {
      this.filterData = this.productData;
    }

  }
}
