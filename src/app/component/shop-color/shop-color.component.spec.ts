import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopColorComponent } from './shop-color.component';

describe('ShopColorComponent', () => {
  let component: ShopColorComponent;
  let fixture: ComponentFixture<ShopColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
