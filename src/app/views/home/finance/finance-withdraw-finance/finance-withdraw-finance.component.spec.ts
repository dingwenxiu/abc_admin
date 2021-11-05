import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceWithdrawFinanceComponent } from './finance-withdraw-finance.component';

describe('FinanceWithdrawFinanceComponent', () => {
  let component: FinanceWithdrawFinanceComponent;
  let fixture: ComponentFixture<FinanceWithdrawFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceWithdrawFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceWithdrawFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
