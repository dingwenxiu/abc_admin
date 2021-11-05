import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotIssueListComponent } from './jackpot-issue-list.component';

describe('JackpotIssueListComponent', () => {
  let component: JackpotIssueListComponent;
  let fixture: ComponentFixture<JackpotIssueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JackpotIssueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
