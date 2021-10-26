import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationCarouselItemComponent } from './invitation-carousel-item.component';

describe('InteractionCarouselItemComponent', () => {
  let component: InteractionCarouselItemComponent;
  let fixture: ComponentFixture<InteractionCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionCarouselItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
