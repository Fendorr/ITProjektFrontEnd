import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartprojectComponent } from './startproject.component';

describe('StartprojectComponent', () => {
  let component: StartprojectComponent;
  let fixture: ComponentFixture<StartprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
