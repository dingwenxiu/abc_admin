import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStatPartnerAddListComponent } from './report-stat-partner-add-list.component';

describe('ReportStatPartnerAddListComponent', () => {
  let component: ReportStatPartnerAddListComponent;
  let fixture: ComponentFixture<ReportStatPartnerAddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStatPartnerAddListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStatPartnerAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
