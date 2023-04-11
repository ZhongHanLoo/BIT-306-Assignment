import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFWAComponent } from './submit-fwa.component';

describe('SubmitFWAComponent', () => {
  let component: SubmitFWAComponent;
  let fixture: ComponentFixture<SubmitFWAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitFWAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitFWAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
