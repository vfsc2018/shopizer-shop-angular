import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Helper } from '../directive/helper';
import { DataSharingService } from '../directive/data-sharing.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'siteheader',
    templateUrl: './siteheader.component.html',
    styleUrls: ['./siteheader.component.scss']
})
export class SiteheaderComponent implements OnInit {
    // @ViewChild("CartComponent") CartComponent: CartComponent;
    api_url=environment.baseUrl;
    merchant = null;
    category: Array<any> = [];
    content: Array<any> = [];
    active: any;
    subclick: any;
    count: number = 0;

    settingShow: boolean = false;

    constructor(
        private appService: AppService,
        private cookieService: CookieService,
        public router: Router,
        private helper: Helper,
        private dataSharingService: DataSharingService,
        private translate: TranslateService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false ;
        this.dataSharingService.count.subscribe(value => {
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
        this.appService.getMethod(action).subscribe(data => {
            this.cookieService.set('store-data', JSON.stringify(data))
            this.merchant = data;
            if(this.merchant.logo)
            {
                this.merchant.logo.path=this.api_url+this.merchant.logo.path;
            }
            if (localStorage.getItem('langulage')) {
                this.translate.setDefaultLang(localStorage.getItem('langulage'));
            } else {
                localStorage.setItem('langulage', data.defaultLanguage);
                this.translate.setDefaultLang(data.defaultLanguage);
            }

            
        }, error => {
            this.router.navigate(['/error']);
        });
    }
    getCategoryHierarchy() {

        let action = Action.CATEGORY + '?count=20&page=0'
        // let action = Action.CATEGORY + '?' + Action.FILTER + '=' + Action.VISIBLE;
        //console.log(action);
        this.appService.getMethod(action)
            .subscribe(data => {
                this.category = data.categories;
            }, error => {
            });
    }
    getContent() {
        let action = Action.CONTENT + Action.PAGES + '?' + Action.STORE + '=' + Action.DEFAULT;
        this.appService.getMethod(action)
            .subscribe(data => {
                this.content = data;
            }, error => {
            });
    }
    onClickCategory(category) {
        // console.log(category)
        this.dataSharingService.categoryData.next(category);
        localStorage.setItem('category_id', JSON.stringify(category))
        this.router.navigate(['/category/' + category.description.friendlyUrl]);

        this.subclick = this.subclick == '' ? 'active' : ''
    }
    onClickContent(content) {
        localStorage.setItem('content_id', JSON.stringify(content));
    }
    onClickMenu() {
        this.active = this.active == '' ? 'active' : ''
    }
    onClicksub() {
        this.active = this.active == '' ? 'active' : ''
    }
    toggleSearch() {
        this.helper.showMiniCart(0);
        this.settingShow = false;
        let x = localStorage.getItem('itemCount');
        this.count = x? JSON.parse(x):0;
    }
    
    onSetting() {
        // this.Helper.showMiniCart(1);
        if (this.dataSharingService.modelRef.getValue()) {
            this.dataSharingService.modelRef.getValue().close()
        }
        this.settingShow = !this.settingShow;
    }
}