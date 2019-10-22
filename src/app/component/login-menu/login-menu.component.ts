import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataSharingService } from '../../directive/data-sharing.service';
@Component({
  selector: 'login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss']
})
export class LoginMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/account']);
    localStorage.removeItem('userData');
    this.cookieService.delete('shopizer-cart-id');
    this.cookieService.delete('localCart');
    this.dataSharingService.isLogin.next(0);

  }
}
