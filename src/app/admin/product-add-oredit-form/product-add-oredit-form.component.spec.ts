import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddOREditFormComponent } from './product-add-oredit-form.component';

describe('ProductAddOREditFormComponent', () => {
  let component: ProductAddOREditFormComponent;
  let fixture: ComponentFixture<ProductAddOREditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddOREditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAddOREditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
