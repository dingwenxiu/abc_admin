import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPartnerBehaviorListComponent } from './history-partner-behavior-list.component';

describe('HistoryPartnerBehaviorListComponent', () => {
  let component: HistoryPartnerBehaviorListComponent;
  let fixture: ComponentFixture<HistoryPartnerBehaviorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPartnerBehaviorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPartnerBehaviorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
