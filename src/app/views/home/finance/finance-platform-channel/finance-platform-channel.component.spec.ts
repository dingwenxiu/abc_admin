import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePlatformChannelComponent } from './finance-platform-channel.component';

describe('FinancePlatformChannelComponent', () => {
  let component: FinancePlatformChannelComponent;
  let fixture: ComponentFixture<FinancePlatformChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancePlatformChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePlatformChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
