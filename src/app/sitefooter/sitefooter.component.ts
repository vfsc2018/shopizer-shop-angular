import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Helper } from '../directive/helper';
import { CookieService } from 'ngx-cookie-service';
import { SafeHtml } from '../shared/utility/safe-html'
import { TranslateService } from '@ngx-translate/core';
import { DataSharingService } from '../directive/data-sharing.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'sitefooter',
  templateUrl: './sitefooter.component.html',
  styleUrls: ['./sitefooter.component.scss']
})
export class SitefooterComponent implements OnInit {
  api_url=environment.baseUrl;
  configuration: any;
  links: any;
  merchant: any;
  category: any;
  content: any;
  pitchContent: any;
  lan: any;
  constructor(
    private appService: AppService,
    private cookieService: CookieService,
    private translate: TranslateService,
    private helper: Helper,
    public router: Router,
    private dataSharingService: DataSharingService,
  ) {
    this.links = [];
    let ls = ["http://www.vifotec.com","http://www.vinacert.vn","http://www.nfsi.vn","http://fb.me/vfscfood","http://youtube.com/channel/UCYs0KCLskkBbY2eK6ynTcsA","http://zalo.me/3925854800876442887" ];
    for(let i=1;i<=ls.length;i++){
      this.links.push({
        a: ls[i-1],
        img: this.api_url + "/static/files/DEFAULT/IMAGE/" + i + ".png"
      })
    }
    this.getStore();
    this.lan = localStorage.getItem('langulage');
  }

  ngOnInit() {
    this.getCategoryHierarchy();
    this.getContent();
    // this.getPitch();
  }
  getStore() {

    let action = Action.STORE + Action.DEFAULT;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.merchant = data;
        if(this.merchant.logo)
        {
            this.merchant.logo.path=this.api_url+this.merchant.logo.path;
        }
      }, error => {
      });
  }
  getCategoryHierarchy() {
    let action = Action.CATEGORY + '?count=20&page=0';
    // let action = Action.CATEGORY + '?' + Action.FILTER + '=' + Action.VISIBLE;
    this.appService.getMethod(action).subscribe(data => {
        this.category = data.categories;
        if(data.categories && data.categories.length==1 && data.categories[0].children){
          this.category[0].children.sort((a,b)=>(a.sortOrder>b.sortOrder)?1:-1);
        }
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
  getPitch() {
    let action = Action.CONTENT + Action.BOXES + Action.PITCH;
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data.boxContent)
        this.pitchContent = data;
      }, error => {
      });
  }
  getYear(date) {
    // console.log(date);
    return new Date(date).getFullYear();
  }
  onClickCategory(category) {
    this.dataSharingService.categoryData.next(category);
    localStorage.setItem('category_id', JSON.stringify(category))
    this.router.navigate(['/category/' + category.description.friendlyUrl]);
  }
  changeLang() {
    console.log(this.lan);
  //  this.helper.languageChange();
    // if (localStorage.getItem('langulage') == 'en') {
    //   localStorage.setItem('langulage', 'fr');
    //   this.translate.use('fr');
    // } else {
    //   localStorage.setItem('langulage', 'en');
    //   this.translate.use('en');
    // }
  }

}
