import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPlayerIpListComponent } from './history-player-ip-list.component';

describe('HistoryPlayerIpListComponent', () => {
  let component: HistoryPlayerIpListComponent;
  let fixture: ComponentFixture<HistoryPlayerIpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPlayerIpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPlayerIpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
