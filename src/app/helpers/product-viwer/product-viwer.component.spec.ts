import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViwerComponent } from './product-viwer.component';

describe('ProductViwerComponent', () => {
  let component: ProductViwerComponent;
  let fixture: ComponentFixture<ProductViwerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViwerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
