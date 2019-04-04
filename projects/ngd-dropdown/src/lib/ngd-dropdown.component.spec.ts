import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgdDropdownComponent } from './ngd-dropdown.component';

describe('NgdDropdownComponent', () => {
  let component: NgdDropdownComponent;
  let fixture: ComponentFixture<NgdDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgdDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgdDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
