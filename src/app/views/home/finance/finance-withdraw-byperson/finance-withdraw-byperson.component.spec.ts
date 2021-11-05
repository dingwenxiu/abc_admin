import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceWithdrawBypersonComponent } from './finance-withdraw-byperson.component';

describe('FinanceWithdrawBypersonComponent', () => {
  let component: FinanceWithdrawBypersonComponent;
  let fixture: ComponentFixture<FinanceWithdrawBypersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceWithdrawBypersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceWithdrawBypersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
