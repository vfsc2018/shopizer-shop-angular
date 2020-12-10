import { Component, NgZone, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { AppService } from '../directive/app.service';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Action } from '../directive/app.constants';
import { Helper } from '../directive/helper';
declare let google: any;
declare var Stripe;
import { MapsAPILoader } from '@agm/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderConfirmComponent } from '../order-confirm/order-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  @ViewChild("search") public searchElementRef: ElementRef;




  @Output() onNumberChange: EventEmitter<any> = new EventEmitter();
  @Output() onDateChange: EventEmitter<any> = new EventEmitter();
  @Output() onCVCChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('cardNumberElement') cardNumberElement: ElementRef;
  @ViewChild('cardExpiryElement') cardExpiryElement: ElementRef;
  @ViewChild('cardCvcElement') cardCvcElement: ElementRef;

  stripe; // : stripe.Stripe;
  cardNumber;
  cardExpiry;
  cardCvc;
  cardNumberErrors;
  cardExpiryErrors;
  cardCvcErrors;

  summeryOrder: any;


  isShipping: Boolean = false;
  isAccount: Boolean = false;
  public scrollbarOptions = { axis: 'y', theme: 'light' };
  // countyData: Array<any> = [];
  isCondition: boolean = false;
  billing = {
    firstName: '',
    lastName: 'Mr/Ms',
    company: '',
    address: '',
    city: 'Hà Nội',
    stateProvince: 'Hà Nội',
    country: 'Việt Nam',
    postalCode: '10000',
    phone: '',
    countryCode: 'VN',
    zone: '',
    email: '',
  };
  comments: string = '';
  note: string = '';
  password: string = '';
  shipping = {
    firstName: '',
    lastName: 'Mr/Ms',
    company: '',
    address: '',
    city: 'Hà Nội',
    stateProvince: 'Hà Nội',
    country: 'Việt Nam',
    postalCode: '10000',
    phone: '',
    countryCode: 'VN',
    zone: '',
    email: '',
    note: ''
  };
  info: any = {};
  cartData: any;
  config: any;
  shippingData: any;
  shippingQuateID: any;
  stateData: Array<any> = [];
  countryData: Array<any> = [];
  shippingStateData: Array<any> = [];
  shippingCountryData: Array<any> = [];
  userDataFlag: boolean = false;
  selectConfig = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: false,
    // limitTo: 5,
    height: '300px',
  };
  // countyData: Array<any> = ['Belarus', 'Canada', 'Romania', 'United State'];
  constructor(
    private appService: AppService,
    private helper: Helper,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public router: Router
  ) {
    // this.getCountry();
    this.getCart();
    this.userDataFlag = localStorage.getItem('userData') ? true : false;

    // let me = this;
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["address"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let p = autocomplete.getPlace();
    //       this.billing.countryCode = p.address_components.find(i => i.types.some(i => i == "country")).short_name;
    //       this.billing.country = p.address_components.find(i => i.types.some(i => i == "country")).long_name;
    //       this.billing.stateProvince = p.address_components.find(i => i.types.some(i => i == "administrative_area_level_1")).long_name;
    //       this.billing.zone = p.address_components.find(i => i.types.some(i => i == "administrative_area_level_1")).short_name;
    //       this.billing.city = p.address_components.find(i => i.types.some(i => i == "locality")).long_name;
    //       let poCode = p.address_components.find(i => i.types.some(i => i == "postal_code"));
    //       if (poCode != undefined) {
    //         this.billing.postalCode = poCode.long_name
    //       }
    //       var componentForm = {
    //         street_number: 'short_name',
    //         route: 'long_name',
    //         sublocality: 'sublocality'
    //       };
    //       let array = [];
    //       for (var i = 0; i < p.address_components.length; i++) {
    //         var addressType = p.address_components[i].types[0];
    //         if (componentForm[addressType]) {
    //           var val = p.address_components[i][componentForm[addressType]];
    //           array.push(val);

    //         }
    //       }
    //       this.billing.address = array.toString();
    //     });
    //   });
    // });
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

  private getCurrency(amount){
    let money = amount + "";
    return this.formatMoney(money) + ".00";
  }

  getCountry() {
    let action = Action.COUNTRY;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.countryData = data;
        this.shippingCountryData = data;
        if (this.userDataFlag) {
          this.getProfile();
        } else {
          this.getCurrentLocation();
        }

      }, error => {
      });
  }
  onBillingCountrySelect(value) {
    if (value.value) {
      this.billing.country = value.value.name;
      this.billing.countryCode = value.value.code;
      this.stateData = value.value.zones;
      this.billing.stateProvince = '';
      this.billing.zone = '';
    }
  }
  onBillingStateSelect(value) {
    this.billing.stateProvince = value.value.name;
    this.billing.zone = value.value.code;
  }

  onShippingCountrySelect(value) {
    this.shipping.country = value.value.name;
    this.shipping.countryCode = value.value.code;
    // //console.log(value)
    this.shippingStateData = value.value.zones;
    this.shipping.stateProvince = '';
    this.shipping.zone = '';
  }
  onShippingStateSelect(value) {
    this.shipping.stateProvince = value.value.name;
    this.shipping.zone = value.value.code;
  }
  // getState(code) {
  //   let action = Action.ZONES;
  //   this.appService.getMethod(action + '?code=' + code)
  //     .subscribe(data => {
  //       this.stateData = data;
  //       this.shippingStateData = data;
  //     }, error => {
  //     });
  // }
  getProfile() {
    let userData = localStorage.getItem('userData');
    if(!userData) return;
    let action = Action.PRIVATE + Action.CUSTOMER + Action.PROFILE;
    this.appService.getMethod(action).subscribe(data => {

        this.billing = data.billing;
        this.billing.email = data.emailAddress;
        // if (data.delivery) {
        //   this.shipping = data.delivery;
        //   let shippingIndex = this.shippingCountryData.findIndex(order => order.code === data.delivery.country);
        //   if (shippingIndex != -1) {
        //     this.shipping.country = this.shippingCountryData[shippingIndex].name;
        //     this.shipping.countryCode = this.shippingCountryData[shippingIndex].code;
        //     this.shippingStateData = this.shippingCountryData[shippingIndex].zones;
        //     let shippingIndex1 = this.shippingStateData.findIndex(order => order.code === data.delivery.zone);
        //     if (shippingIndex1 != 1) {
        //       this.shipping.stateProvince = this.shippingStateData[shippingIndex1].name;
        //       this.shipping.zone = this.shippingStateData[shippingIndex1].zone;
        //     }
        //   }
        // }
        let index = this.countryData.findIndex(order => order.code === data.billing.country);
        if (index != -1) {
          this.billing.country = this.countryData[index].name;
          this.billing.countryCode = this.countryData[index].code;
          ////console.log(this.countryData[index]);
          this.stateData = this.countryData[index].zones;
          // let index1 = this.stateData.findIndex(order => order.code === data.billing.zone);
          // if (index != 1) {
            // this.billing.stateProvince = this.stateData[index1].name;
            // this.billing.zone = this.stateData[index1].code;
          // }
        }
        // this.onShippingChange();
        // ////console.log(index, '***********');
      }, error => {
      });
  }
  getCurrentLocation() {
    let me = this;
    this.helper.getLocation(function (result, error) {
      if (error) {
        ////console.log(error)
      } else {
        // //console.log(result)
        me.billing.countryCode = result.find(i => i.types.some(i => i == "country")).short_name;
        me.billing.country = result.find(i => i.types.some(i => i == "country")).long_name;
        me.billing.stateProvince = result.find(i => i.types.some(i => i == "administrative_area_level_1")).long_name;
        me.billing.zone = result.find(i => i.types.some(i => i == "administrative_area_level_1")).short_name;
        me.billing.city = result.find(i => i.types.some(i => i == "locality")).long_name;
        // //console.log(me.checkout.country);
      }
    })

  }
  getCart() {

    let cartCode = this.cookieService.get('vfscfood-cart-id');
    if(!cartCode) return;
    
    this.spinnerService.show();
    let action = Action.CART;  
    this.appService.getMethod(action + cartCode)
      .subscribe(data => {
        this.spinnerService.hide();
        this.cartData = data;
        this.getOrderTotal('')
      }, error => {
        this.spinnerService.hide();
      });
    
  }
  getOrderTotal(quoteID) {  
    this.getConfig();  
    let action;

    if (quoteID) {
      action = Action.CART + this.cartData.code+ '/' + Action.TOTAL + '?quote=' + quoteID;
    } else {
      action = Action.CART + this.cartData.code + '/' + Action.TOTAL;
    }
    // }

    this.appService.getMethod(action)
      .subscribe(data => {       
        this.summeryOrder = data;
        this.spinnerService.hide();
      }, error => {

        this.spinnerService.hide();
      });   

  }
  getConfig() {
    let action = Action.CONFIG;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.config = data;
        // this.summeryOrder = data;
      }, error => {
      });
  }
  ngOnInit() {
    this.appService.getMethod("information").subscribe(data => {       
        this.info = data;
    }, error => { });
    // this.stripe = Stripe(environment.stripeKey);
    // const elements = this.stripe.elements();

    // this.cardNumber = elements.create('cardNumber');
    // this.cardNumber.mount(this.cardNumberElement.nativeElement);

    // this.cardNumber.addEventListener('change', ({ error }) => {
    //   this.cardNumberErrors = error && error.message;
    // });

    // this.cardExpiry = elements.create('cardExpiry');
    // this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    // this.cardExpiry.addEventListener('change', ({ error }) => {

    //   this.cardExpiryErrors = error && error.message;
    // });

    // this.cardCvc = elements.create('cardCvc');
    // this.cardCvc.mount(this.cardCvcElement.nativeElement);

    // this.cardCvc.addEventListener('change', ({ error }) => {

    //   this.cardCvcErrors = error && error.message;
    // });
  }

  onShippingChange() {
    console.log('shippingChange')
    this.spinnerService.show();
    let action = Action.CART + this.cartData.code + '/' + Action.SHIPPING;
    console.log(action)
    let param = {}
    if (this.isShipping) {
      param = { 'postalCode': this.shipping.postalCode, 'countryCode': this.shipping.countryCode }
    } else {
      param = { 'postalCode': this.billing.postalCode, 'countryCode': this.billing.countryCode }
    }
     console.log(param)
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data)
        this.shippingData = data;
        this.spinnerService.hide();
      }, error => {

        this.spinnerService.hide();
      });
  }
  shippingQuoteChange(value) {
    this.getOrderTotal(value.shippingQuoteOptionId)
  }
  // onShipDiffrent(event) {
  //   this.isShipping = !this.isShipping;
  //   if (event.target.checked) {
  //     this.shipping = {
  //       firstName: this.billing.firstName,
  //       lastName: this.billing.lastName,
  //       company: this.billing.company,
  //       address: this.billing.address,
  //       // address1: this.checkout.address1,
  //       city: this.billing.city,

  //       stateProvince: this.billing.stateProvince,
  //       zone: this.billing.zone,
  //       country: this.billing.country,
  //       countryCode: this.billing.countryCode,
  //       postalCode: this.billing.postalCode,
  //       phone: this.billing.phone,
  //       email: this.billing.email

  //     }
  //     // this.onShippingChange();
  //   } else {
  //     this.shipping = {
  //       firstName: '',
  //       lastName: '',
  //       company: '',
  //       address: '',
  //       city: '',
  //       stateProvince: 'Hà Nội',
  //       zone: '',
  //       country: 'Việt Nam',
  //       countryCode: 'VN',
  //       postalCode: '10000',
  //       phone: '',
  //       email: ''
  //     }
  //   }
  // }
  onCreateAccount() {
    this.isAccount = !this.isAccount;
  }
  onPhoneChange() {
    // this.billing.phone = new AsYouType('US').input(this.billing.phone);
  }
  termCondition() {
    this.isCondition = !this.isCondition;
  }
  errMessage: string;
  isSubmitted: boolean = false;
  isShippingSubmitted: boolean = false;
  async onPayment() {
    let language = localStorage.getItem('langulage');
    // let bill = this.billing;
    // let shippingBill = this.shipping;
    
    this.isSubmitted = false;
    this.isShippingSubmitted = false;
     console.log(this.isShipping);
    if (!this.isCondition) {
      console.log('if')
      this.errMessage = 'Please agree to our terms and conditions'
    } else 
    {
      // if (bill.firstName == '' || bill.lastName == '' || bill.address == '' || bill.city == '' || bill.countryCode == '' || bill.zone == '' || bill.postalCode == '' || bill.phone == '' || bill.email == '') {
        // console.log('else if')
        // this.isSubmitted = true;
      // }
      // else if (shippingBill.firstName == '' || shippingBill.lastName == '' || shippingBill.address == '' || shippingBill.city == '' || shippingBill.countryCode == '' || shippingBill.zone == '' || shippingBill.postalCode == '') {
      //   console.log(shippingBill);
      //   if (this.isShipping) {
      //     this.isShippingSubmitted = true
      //   }
      // }
      // else {
        console.log('checkout')
        // this.spinnerService.show();
        // const { token, error } = await this.stripe.createToken(this.cardNumber);
        // if (error) {
  
        //   const cardErrors = error.message;
        //   this.spinnerService.hide();
        //    console.log(error);
        // } else {
          let action;
          let param = {};
          if (this.userDataFlag) {
            action = Action.PRIVATE + Action.CART + this.cartData.code + '/' + Action.CHECKOUT
            param = {
              "currency": "VND",
              "comments": this.comments,
              "customerAgreement": true,
              "payment": {
                "paymentType": "MONEYORDER",
                "transactionType": "CAPTURE",
                "paymentModule": "moneyorder",
                "paymentToken": "",
                "amount": this.getCurrency(this.summeryOrder.totals[this.summeryOrder.totals.length - 1].value)
              }
            }
            
          } else {
            action = Action.CART + this.cartData.code + '/' + Action.CHECKOUT
            let customer = {
                "emailAddress":  this.billing.phone + "@vfsc.vn",
                "language": language,
                "password": this.password,
                "userName":  this.billing.phone  + "@vfsc.vn",
                "billing": {
                  "address": this.billing.address,
                  "company": this.billing.company,
                  "city": this.billing.city,
                  "postalCode": this.billing.postalCode,
                  "country": this.billing.countryCode,
                  "stateProvince": this.billing.stateProvince,
                  "zone": this.billing.zone,
                  "firstName": this.billing.firstName,
                  "lastName": this.billing.lastName,
                  "phone": this.billing.phone
                }
              }
            
            param = {
              "currency": "VND",
              "comments": this.comments,
              "customerAgreement": true,
              "payment": {
                "paymentType": "MONEYORDER",
                "transactionType": "CAPTURE",
                "paymentModule": "moneyorder",
                "paymentToken": "",
                "amount": this.getCurrency(this.summeryOrder.totals[this.summeryOrder.totals.length - 1].value)
              },
              "customer": customer
            }
          }
          this.appService.postMethod(action, param)
            .subscribe(data => {
              console.log(data)
              let modalRef = this.modalService.open(OrderConfirmComponent, {
                windowClass: 'order-detail'
              });
              modalRef.componentInstance.orderID = data.id;
              modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
                console.log(receivedEntry);
                modalRef.close()
  
              });
              this.toastr.success('Your order has been submitted', 'Well done!');
              this.router.navigate(['/']);
              this.spinnerService.hide();
            }, error => {
              this.spinnerService.hide();
              this.toastr.error('Your order submission has been failed', 'Error');
            });
  
  
       // }
      // }
    }
    
   

  }
}       
