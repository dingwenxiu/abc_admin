import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModelListComponent } from './system-model-list.component';

describe('SystemModelListComponent', () => {
  let component: SystemModelListComponent;
  let fixture: ComponentFixture<SystemModelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemModelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
