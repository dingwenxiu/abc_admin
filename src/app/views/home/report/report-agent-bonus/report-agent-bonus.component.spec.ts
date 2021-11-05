import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAgentBonusComponent } from './report-agent-bonus.component';

describe('ReportAgentBonusComponent', () => {
  let component: ReportAgentBonusComponent;
  let fixture: ComponentFixture<ReportAgentBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAgentBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAgentBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
