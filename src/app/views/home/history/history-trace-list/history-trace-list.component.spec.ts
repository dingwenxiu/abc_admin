import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTraceListComponent } from './history-trace-list.component';

describe('HistoryTraceListComponent', () => {
  let component: HistoryTraceListComponent;
  let fixture: ComponentFixture<HistoryTraceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTraceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTraceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
