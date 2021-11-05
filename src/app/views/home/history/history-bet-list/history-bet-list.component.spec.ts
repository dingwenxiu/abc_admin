import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBetListComponent } from './history-bet-list.component';

describe('HistoryBetListComponent', () => {
  let component: HistoryBetListComponent;
  let fixture: ComponentFixture<HistoryBetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
