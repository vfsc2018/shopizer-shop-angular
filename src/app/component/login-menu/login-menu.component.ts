import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss']
})
export class LoginMenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/account']);
    localStorage.removeItem('userData');
  }
}
