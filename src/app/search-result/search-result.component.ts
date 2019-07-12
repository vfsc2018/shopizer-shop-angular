import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action, AppConstants } from '../directive/app.constants';
import { DataSharingService } from '../directive/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private appService: AppService,
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
  getSearchResult(query) {
    let action = Action.SEARCH;
    let param = { 'query': query }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data)
        this.totalRecord = data.productCount;
        this.searchResult = data.products;
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
