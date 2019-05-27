import { Component, OnInit } from '@angular/core';
import { Merchant } from '../services/configuration/merchant'
import { Category } from '../services/category/model/category'
import { ConfigurationService } from '../services/configuration/configuration.service'
import { CategoryService } from '../services/category/category.service'

@Component({
  selector: 'siteheader',
  templateUrl: './siteheader.component.html',
  styleUrls: ['./siteheader.component.scss']
})
export class SiteheaderComponent implements OnInit {

  merchant = null;
  category:Category[];

  constructor(private configurationService : ConfigurationService,
              private categoryService : CategoryService
              ) {}

  ngOnInit() {
    this.configurationService.getMerchant()
      .subscribe((data:Merchant) => {
        this.merchant = data;
        console.log('Merchant name ' + this.merchant.name);
    });
    this.categoryService.getCategoryHierarchy()
      .subscribe((data:Category[]) => {
        this.category = data;
        console.log('Category size ' + this.category.length);
  });
  }

}
