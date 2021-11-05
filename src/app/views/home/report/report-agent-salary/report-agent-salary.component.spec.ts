import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAgentSalaryComponent } from './report-agent-salary.component';

describe('ReportAgentSalaryComponent', () => {
  let component: ReportAgentSalaryComponent;
  let fixture: ComponentFixture<ReportAgentSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAgentSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAgentSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
