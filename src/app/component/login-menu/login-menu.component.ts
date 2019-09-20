import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss']
})
export class LoginMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/account']);
    localStorage.removeItem('userData');
    this.cookieService.delete('shopizer-cart-id');
    this.cookieService.delete('localCart');

  }
}
