import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailGroupEditComponent } from './email-group-edit.component';

describe('EmailGroupEditComponent', () => {
  let component: EmailGroupEditComponent;
  let fixture: ComponentFixture<EmailGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailGroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
