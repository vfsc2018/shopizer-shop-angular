import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSizeComponent } from './shop-size.component';

describe('ShopColorComponent', () => {
  let component: ShopSizeComponent;
  let fixture: ComponentFixture<ShopSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopSizeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
