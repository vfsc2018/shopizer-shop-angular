import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'shopizer';
    constructor(private router: Router, private titleService: Title, public activatedRoute: ActivatedRoute, ) {
        // translate.setDefaultLang('en');
        // this.router.navigate(['/home']);
        this.router.events.pipe(map(() => {
            let child = this.activatedRoute.firstChild;
            while (child) {
                if (child.firstChild) {
                    child = child.firstChild;
                } else if (child.snapshot.data && child.snapshot.data['title']) {
                    return child.snapshot.data['title'];
                } else {
                    return null;
                }
            }
            return null;
        })).subscribe(title => {
            this.titleService.setTitle(title);
        });


        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

    }

}
