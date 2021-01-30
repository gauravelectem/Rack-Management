import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailGroupComponent } from './email-group.component';

describe('EmailGroupComponent', () => {
  let component: EmailGroupComponent;
  let fixture: ComponentFixture<EmailGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
