import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePayChannelComponent } from './finance-pay-channel.component';

describe('FinancePayChannelComponent', () => {
  let component: FinancePayChannelComponent;
  let fixture: ComponentFixture<FinancePayChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancePayChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePayChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
