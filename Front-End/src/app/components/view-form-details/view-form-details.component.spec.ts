import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormDetailsComponent } from './view-form-details.component';

describe('ViewFormDetailsComponent', () => {
  let component: ViewFormDetailsComponent;
  let fixture: ComponentFixture<ViewFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
