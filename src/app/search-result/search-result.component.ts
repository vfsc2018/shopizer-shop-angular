import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action, AppConstants } from '../directive/app.constants';
import { DataSharingService } from '../directive/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Helper } from '../directive/helper';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  showGrid: Boolean = false;
  show_product: any = 10;
  totalRecord: Number = 0;
  searchResult: Array<any> = [];
  categoryFactes: Array<any> = [];
  api_url=environment.baseUrl;

  constructor(
    private appService: AppService,
    private helper: Helper,
    private dataSharingService: DataSharingService,
    public router: Router,
    public ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.paramMap.subscribe(
      params => {
        this.getSearchResult(params.get('id'));
      })
  }
  ngOnInit() {

  }
  goToDetailsPage(result) {
    this.router.navigate(['/product-detail'], { queryParams: { productId: result.id } });
    // this.router.navigate(['/product-detail'], { param: { productid: result.id } });
  }
  getSearchResult(query) {
    let action = Action.SEARCH;
    let param = { 'query': query }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data)
        this.totalRecord = data.productCount;
        let products = data.products;
        if(products){
          products.map(e=>{
            e.showDateAvailable = this.helper.checkDateAvailable(e.dateAvailable);
            if(e.image && e.image.imageUrl.indexOf("http")<0)
            {
              e.image.imageUrl=this.api_url+ e.image.imageUrl;
              e.images.map(ex=>{
                if(ex.imageUrl.indexOf("http")<0)
                {
                  ex.imageUrl=this.api_url+ ex.imageUrl;
                }     
              });
            }     
          });
        }
        this.searchResult = products;
        this.categoryFactes = data.categoryFacets
      }, error => {
      });
  }
  onHideShowGrid() {
    this.showGrid = !this.showGrid;
  }
  onFilter(category) {
    console.log(category);
    this.dataSharingService.categoryData.next(category);
    localStorage.setItem('category_id', JSON.stringify(category))
    this.router.navigate(['/category/' + category.description.friendlyUrl]);
  }
}
