import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditmovieComponent } from './addeditmovie.component';

describe('AddeditmovieComponent', () => {
  let component: AddeditmovieComponent;
  let fixture: ComponentFixture<AddeditmovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditmovieComponent]
    });
    fixture = TestBed.createComponent(AddeditmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
