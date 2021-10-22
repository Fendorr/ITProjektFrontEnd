import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedProjectsItemComponent } from './liked-projects-item.component';

describe('LikedProjectsItemComponent', () => {
  let component: LikedProjectsItemComponent;
  let fixture: ComponentFixture<LikedProjectsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedProjectsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedProjectsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
