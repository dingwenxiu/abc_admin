import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerConfigureListComponent } from './partner-configure-list.component';

describe('PartnerConfigureListComponent', () => {
  let component: PartnerConfigureListComponent;
  let fixture: ComponentFixture<PartnerConfigureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerConfigureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerConfigureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
