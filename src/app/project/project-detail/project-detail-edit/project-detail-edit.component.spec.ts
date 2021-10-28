import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailEditComponent } from './project-detail-edit.component';

describe('ProjectDetailEditComponent', () => {
  let component: ProjectDetailEditComponent;
  let fixture: ComponentFixture<ProjectDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
