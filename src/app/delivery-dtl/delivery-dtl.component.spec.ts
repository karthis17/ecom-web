import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDtlComponent } from './delivery-dtl.component';

describe('DeliveryDtlComponent', () => {
  let component: DeliveryDtlComponent;
  let fixture: ComponentFixture<DeliveryDtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryDtlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
