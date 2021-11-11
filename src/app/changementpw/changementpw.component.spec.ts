import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementpwComponent } from './changementpw.component';

describe('ChangementpwComponent', () => {
  let component: ChangementpwComponent;
  let fixture: ComponentFixture<ChangementpwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangementpwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangementpwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
