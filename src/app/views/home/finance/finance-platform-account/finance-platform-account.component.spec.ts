import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePlatformAccountComponent } from './finance-platform-account.component';

describe('FinancePlatformAccountComponent', () => {
  let component: FinancePlatformAccountComponent;
  let fixture: ComponentFixture<FinancePlatformAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancePlatformAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePlatformAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
