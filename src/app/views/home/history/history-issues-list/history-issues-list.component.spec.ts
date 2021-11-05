import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryIssuesListComponent } from './history-issues-list.component';

describe('HistoryIssuesListComponent', () => {
  let component: HistoryIssuesListComponent;
  let fixture: ComponentFixture<HistoryIssuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryIssuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryIssuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
