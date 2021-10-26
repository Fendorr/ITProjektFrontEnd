import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCarouselItemComponent } from './application-carousel-item.component';

describe('ApplicationCarouselItemComponent', () => {
  let component: ApplicationCarouselItemComponent;
  let fixture: ComponentFixture<ApplicationCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCarouselItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
