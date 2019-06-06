import { Component, OnInit } from '@angular/core';
import { Merchant } from '../services/configuration/merchant'
import { Category } from '../services/category/model/category'
import { ConfigurationService } from '../services/configuration/configuration.service'
import { CategoryService } from '../services/category/category.service'
import { ContentService } from '../shared/services/content/content.service'
import { Content } from '../shared/model/content/content'

@Component({
  selector: 'siteheader',
  templateUrl: './siteheader.component.html',
  styleUrls: ['./siteheader.component.scss']
})
export class SiteheaderComponent implements OnInit {

  merchant = null;
  category:Category[];
  content:Content[];

  constructor(private configurationService : ConfigurationService,
              private categoryService : CategoryService,
              private contentService : ContentService
              ) {}

  ngOnInit() {
    this.configurationService.getMerchant()
      .subscribe((data:Merchant) => {
        this.merchant = data;
    });
    this.categoryService.getCategoryHierarchy()
      .subscribe((data:Category[]) => {
        this.category = data;
    });
    this.contentService.getContentMenu()
      .subscribe((data:Content[]) => {
        this.content = data;
    });
  }

}
