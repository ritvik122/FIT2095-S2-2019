import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActorToMovieComponent } from './add-actor-to-movie.component';

describe('AddActorToMovieComponent', () => {
  let component: AddActorToMovieComponent;
  let fixture: ComponentFixture<AddActorToMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActorToMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActorToMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
