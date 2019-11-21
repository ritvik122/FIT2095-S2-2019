import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllActorsAndMoviesComponent } from './delete-all-actors-and-movies.component';

describe('DeleteAllActorsAndMoviesComponent', () => {
  let component: DeleteAllActorsAndMoviesComponent;
  let fixture: ComponentFixture<DeleteAllActorsAndMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAllActorsAndMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAllActorsAndMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
