import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedUserComponent } from './purchased-user.component';

describe('PurchasedUserComponent', () => {
  let component: PurchasedUserComponent;
  let fixture: ComponentFixture<PurchasedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasedUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchasedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
