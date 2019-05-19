import { Component, OnInit } from '@angular/core';
import { Merchant } from '../services/configuration/merchant'
import { ConfigurationService } from '../services/configuration/configuration.service'

@Component({
  selector: 'siteheader',
  templateUrl: './siteheader.component.html',
  styleUrls: ['./siteheader.component.scss']
})
export class SiteheaderComponent implements OnInit {

  merchant = null;

  constructor(private configurationService : ConfigurationService) {}

  ngOnInit() {
    this.configurationService.getMerchant()
      .subscribe((data:Merchant) => {
        this.merchant = data;
        console.log('Merchant name ' + this.merchant.name);
    });
  }

}
