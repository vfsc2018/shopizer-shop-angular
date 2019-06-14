import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss']
})
export class BestSellerComponent implements OnInit {
  @Input() data: any[];
  constructor() { }

  ngOnInit() {
  }

}
