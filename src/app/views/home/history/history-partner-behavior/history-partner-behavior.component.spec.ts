import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPartnerBehaviorComponent } from './history-partner-behavior.component';

describe('HistoryPartnerBehaviorComponent', () => {
  let component: HistoryPartnerBehaviorComponent;
  let fixture: ComponentFixture<HistoryPartnerBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPartnerBehaviorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPartnerBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
