import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MapsAPILoader } from '@agm/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { ToastrService } from 'ngx-toastr';
declare let google: any;

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number;
  lng: number;
  zoom: number = 15;
  contactData: any;
  contact = {
    username: '',
    email: '',
    subject: '',
    message: ''
  }
  constructor(
    private cookieService: CookieService,
    private mapsAPILoader: MapsAPILoader,
    private appService: AppService,
    private toastr: ToastrService
  ) {
    this.contactData = JSON.parse(this.cookieService.get('store-data'));
    // console.log(this.contactData);
    this.getGeoLocation()
  }

  ngOnInit() { }

  getGeoLocation() {
    var me = this;
    this.mapsAPILoader.load().then(() => {
      if (navigator.geolocation) {
        let geocoder = new google.maps.Geocoder();
        let address = this.contactData.address.address + this.contactData.address.city
        geocoder.geocode({
          'address': address
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // console.log(results[0].geometry.location.lat());
            // console.log(results[0].geometry.location.lng());
            me.lat = results[0].geometry.location.lat()
            me.lng = results[0].geometry.location.lng()
          } else {
          }
        });
      }
    });
  }
  onSendFeedBack() {
    let action = Action.CONTACT;
    let param = { "name": this.contact.username, "email": this.contact.email, 'subject': this.contact.subject, 'comment': this.contact.message }
    this.appService.postMethod(action, param)
      .subscribe(data => {

      }, error => {
        this.toastr.success('Your message has been sent');
        this.contact = {
          username: '',
          email: '',
          subject: '',
          message: ''
        }
      });
  }
}

