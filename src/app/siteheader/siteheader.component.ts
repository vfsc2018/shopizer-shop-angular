import { Component, OnInit } from '@angular/core';
import { Merchant } from '../configuration/merchant'
import { ConfigurationService } from '../configuration/configuration.service'

@Component({
  selector: 'siteheader',
  templateUrl: './siteheader.component.html',
  styleUrls: ['./siteheader.component.scss']
})
export class SiteheaderComponent implements OnInit {

  private merchant : Merchant = null;

  constructor(configurationService : ConfigurationService) {

    this.merchant = configurationService.getMerchant();
    console.log(this.merchant);

  }

  ngOnInit() {
  }

}
