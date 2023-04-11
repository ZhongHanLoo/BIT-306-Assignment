import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFWAComponent } from './review-fwa.component';

describe('ReviewFWAComponent', () => {
  let component: ReviewFWAComponent;
  let fixture: ComponentFixture<ReviewFWAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewFWAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewFWAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
