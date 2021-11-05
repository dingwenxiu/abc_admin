import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePayTypeComponent } from './finance-pay-type.component';

describe('FinancePayTypeComponent', () => {
  let component: FinancePayTypeComponent;
  let fixture: ComponentFixture<FinancePayTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancePayTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePayTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
