import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { CookieService } from 'ngx-cookie-service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from '../cart/cart.component';
import { DataSharingService } from '../directive/data-sharing.service';
import { Router } from '@angular/router';

@Component({
    selector: 'siteheader',
    templateUrl: './siteheader.component.html',
    styleUrls: ['./siteheader.component.scss']
})
export class SiteheaderComponent implements OnInit {
    // @ViewChild("CartComponent") CartComponent: CartComponent;

    merchant = null;
    category: Array<any> = [];
    content: Array<any> = [];
    active: any;
    subclick: any;
    count: number = 0;
    constructor(
        private appService: AppService,
        private cookieService: CookieService,
        public router: Router,
        private modalService: NgbModal,
        private dataSharingService: DataSharingService
    ) {
        this.dataSharingService.count.subscribe(value => {
            localStorage.setItem('itemCount', JSON.stringify(value))
            this.count = value;
        });
        this.count = JSON.parse(localStorage.getItem('itemCount'));
    }

    ngOnInit() {
        this.getStore();
        this.getCategoryHierarchy();
        this.getContent();

    }
    getStore() {
        let action = Action.STORE + Action.DEFAULT;
        this.appService.getMethod(action)
            .subscribe(data => {
                this.merchant = data;
                this.cookieService.set('store-data', JSON.stringify(data))
            }, error => {
            });
    }
    getCategoryHierarchy() {

        let action = Action.CATEGORY + '?' + Action.FILTER + '=' + Action.FEATURED;
        this.appService.getMethod(action)
            .subscribe(data => {
                // console.log(data);
                this.category = data;
            }, error => {
            });
    }
    getContent() {
        let action = Action.CONTENT + Action.PAGES + '?' + Action.STORE + '=' + Action.DEFAULT;
        this.appService.getMethod(action)
            .subscribe(data => {
                // console.log(data)
                this.content = data;
            }, error => {
            });
    }
    onClickCategory(data) {
        // console.log(data)
        // localStorage.setItem('category_id', data.id);

        this.router.navigate(['/shop'], { queryParams: { categoryId: data.id } });
        this.subclick = this.subclick == '' ? 'active' : ''
    }
    onClickMenu() {
        this.active = this.active == '' ? 'active' : ''
    }
    onClicksub() {
        this.active = this.active == '' ? 'active' : ''
    }
    toggleSearch() {
        let modalRef = this.modalService.open(CartComponent);
        modalRef.componentInstance.isOpen = true;
    }
}