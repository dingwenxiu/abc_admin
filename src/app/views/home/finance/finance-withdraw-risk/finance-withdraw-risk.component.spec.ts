import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceWithdrawRiskComponent } from './finance-withdraw-risk.component';

describe('FinanceWithdrawRiskComponent', () => {
  let component: FinanceWithdrawRiskComponent;
  let fixture: ComponentFixture<FinanceWithdrawRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceWithdrawRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceWithdrawRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
