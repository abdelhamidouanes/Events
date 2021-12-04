import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Presence2Component } from './presence2.component';

describe('Presence2Component', () => {
  let component: Presence2Component;
  let fixture: ComponentFixture<Presence2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Presence2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Presence2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
