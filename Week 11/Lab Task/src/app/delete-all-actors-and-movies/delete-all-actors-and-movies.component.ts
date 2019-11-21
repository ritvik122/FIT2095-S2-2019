import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-all-actors-and-movies',
  templateUrl: './delete-all-actors-and-movies.component.html',
  styleUrls: ['./delete-all-actors-and-movies.component.css']
})
export class DeleteAllActorsAndMoviesComponent {
  private actorsDB: any[] = [];
  private moviesDB: any[] = [];
  constructor(private dbService: DatabaseService, private router: Router) { }

  // Function to delete all actors
  onGetActors() {
    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
      for (let i = 0; i < this.actorsDB.length; i++) {
        this.onDeleteActor(this.actorsDB[i]);
      }
      alert("Success !");
    });
  }

    //Delete Actor
    onDeleteActor(item) {
      this.dbService.deleteActor(item._id).subscribe(result => {
        console.log("An actor with id: " + item._id + " has been deleted.");
      });
    }

    onGetMovies() {
      this.dbService.getMovies().subscribe((data: any[]) => {
        this.moviesDB = data;
        for (let j = 0; j < this.moviesDB.length; j++) {
          this.onDeleteMovie(this.moviesDB[j]);
        }
        alert("Success !");
      });
    }

      // Function to delete an actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      console.log("A movie with id: " + item._id + " has been deleted.");
    });
  }

}
