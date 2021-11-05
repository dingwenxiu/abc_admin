import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPlayerCommissionListComponent } from './history-player-commission-list.component';

describe('HistoryPlayerCommissionListComponent', () => {
  let component: HistoryPlayerCommissionListComponent;
  let fixture: ComponentFixture<HistoryPlayerCommissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPlayerCommissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPlayerCommissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
