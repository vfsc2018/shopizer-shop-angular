import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shopizer';
  constructor(private router: Router) {
    // translate.setDefaultLang('en');
    // this.router.navigate(['/home']);
  }
}
