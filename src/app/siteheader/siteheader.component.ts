import { Component, OnInit } from '@angular/core';
// import { Merchant } from '../services/configuration/merchant'
// import { Category } from '../services/category/model/category'
// import { ConfigurationService } from '../services/configuration/configuration.service'
// import { CategoryService } from '../services/category/category.service'
// import { ContentService } from '../shared/services/content/content.service'
// import { Content } from '../shared/model/content/content'
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';

@Component({
    selector: 'siteheader',
    templateUrl: './siteheader.component.html',
    styleUrls: ['./siteheader.component.scss']
})
export class SiteheaderComponent implements OnInit {

    merchant = null;
    category: Array<any> = [];
    content: Array<any> = [];
    active: any;
    subclick: any;
    constructor(
        private appService: AppService,
        private cookieService: CookieService, public router: Router
        // private configurationService: ConfigurationService,
        // private categoryService: CategoryService,
        // private contentService: ContentService
    ) { }

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
        localStorage.setItem('category_id', data.id);
        this.router.navigate(['/shop']);
        this.subclick = this.subclick == '' ? 'active' : ''
    }
    onClickMenu() {
        this.active = this.active == '' ? 'active' : ''
    }
    onClicksub() {
        this.active = this.active == '' ? 'active' : ''
    }
}
