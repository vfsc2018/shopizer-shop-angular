import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import { Helper } from 'src/app/directive/helper';
import { DataSharingService } from '../../directive/data-sharing.service';

@Component({
  selector: 'login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss']
})
export class LoginMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private helper: Helper,
    // private cookieService: CookieService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/account']);
    localStorage.removeItem('userData');
    this.helper.resetCart();
    // this.cookieService.delete('vfscfood-cart-id');
    // this.cookieService.delete('localCart');
    this.dataSharingService.isLogin.next(0);

  }
}
