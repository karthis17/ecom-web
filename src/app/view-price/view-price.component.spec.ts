import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPriceComponent } from './view-price.component';

describe('ViewPriceComponent', () => {
  let component: ViewPriceComponent;
  let fixture: ComponentFixture<ViewPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
