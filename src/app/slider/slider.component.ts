import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: "slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit {
  constructor(public router: Router) { }
  @Input() slideData: any[];
  ngOnInit() { }

  goToShop() {
    localStorage.setItem('category_id', '')
    this.router.navigate(['/shop']);
  }


}
