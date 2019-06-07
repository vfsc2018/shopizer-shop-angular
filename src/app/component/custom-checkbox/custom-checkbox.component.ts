import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit {
  @Input() label: string
  constructor() { }

  ngOnInit() {
  }

}
