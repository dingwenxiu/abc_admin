import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePayAccountComponent } from './finance-pay-account.component';

describe('FinancePayAccountComponent', () => {
  let component: FinancePayAccountComponent;
  let fixture: ComponentFixture<FinancePayAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancePayAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePayAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
