import { Injectable } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataSharingService } from '../directive/data-sharing.service';
import { TranslateService } from '@ngx-translate/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
declare let google: any;

@Injectable()
export class Helper {
    loading: any;
    constructor(
        private dataSharingService: DataSharingService,
        private modalService: NgbModal,
        private translate: TranslateService,
        private mapsAPILoader: MapsAPILoader,
        private http: HttpClient
    ) { }


    showMiniCart(value) {
        console.log(value);
        if (this.dataSharingService.modelRef.getValue()) {
            this.dataSharingService.modelRef.getValue().close()
            if (value == 1) {
                let modalRef = this.modalService.open(CartComponent, {
                    backdrop: false,
                    windowClass: 'cart'
                });
                modalRef.componentInstance.isOpen = true;
                this.dataSharingService.modelRef.next(modalRef);
            } else {
                this.dataSharingService.modelRef.next('');
            }

        } else {
            let modalRef = this.modalService.open(CartComponent, {
                backdrop: false,
                windowClass: 'cart'
            });
            modalRef.componentInstance.isOpen = true;
            this.dataSharingService.modelRef.next(modalRef);
        }
    }

    languageChange() {
        if (localStorage.getItem('langulage') == 'en') {
            localStorage.setItem('langulage', 'fr');
            this.translate.use('fr');
        } else {
            localStorage.setItem('langulage', 'en');
            this.translate.use('en');
        }
    }
    getLocation(callback) {
        let self = this;
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    //this.geolocationPosition = position,
                    self.mapsAPILoader.load().then(() => {
                        if (navigator.geolocation) {
                            let geocoder = new google.maps.Geocoder();
                            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                            geocoder.geocode({
                                'location': myLatlng
                            }, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    // /me.contract.vAddress = results[0].formatted_address;
                                    // console.log(results[0].address_components)
                                    callback(results[0].address_components)
                                    // let country = results[0].address_components.find(i => i.types.some(i => i == "country"));
                                    // if (country) {
                                    //     console.log(country.short_name)
                                    // }
                                } else {
                                    callback(false);
                                }
                            });
                        }
                    });

                },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission Denied');
                            break;
                        case 2:
                            console.log('Position Unavailable');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                }
            );
        };
    }
    getIPAddress(callback) {
        this.http.get<{ ip: string }>('https://jsonip.com')
            .subscribe(data => {
                // console.log('th data', data);
                callback(data)
            })
    }
}