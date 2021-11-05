import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMoneyChangeListComponent } from './history-money-change-list.component';

describe('HistoryMoneyChangeListComponent', () => {
  let component: HistoryMoneyChangeListComponent;
  let fixture: ComponentFixture<HistoryMoneyChangeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMoneyChangeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMoneyChangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
