import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMovieDetailComponent } from './user-movie-detail.component';

describe('UserMovieDetailComponent', () => {
  let component: UserMovieDetailComponent;
  let fixture: ComponentFixture<UserMovieDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMovieDetailComponent]
    });
    fixture = TestBed.createComponent(UserMovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
