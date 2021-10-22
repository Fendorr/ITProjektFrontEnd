import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedProjectsListComponent } from './liked-projects-list.component';

describe('LikedProjectsListComponent', () => {
  let component: LikedProjectsListComponent;
  let fixture: ComponentFixture<LikedProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedProjectsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
