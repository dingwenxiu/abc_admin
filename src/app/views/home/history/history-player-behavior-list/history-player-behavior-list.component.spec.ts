import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPlayerBehaviorListComponent } from './history-player-behavior-list.component';

describe('HistoryPlayerBehaviorListComponent', () => {
  let component: HistoryPlayerBehaviorListComponent;
  let fixture: ComponentFixture<HistoryPlayerBehaviorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPlayerBehaviorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPlayerBehaviorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
