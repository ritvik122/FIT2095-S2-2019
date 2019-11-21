import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {
  private moviesDB: any[] = [];
  constructor(private dbService: DatabaseService, private router: Router) { }

  // Function to save all the actors in a database
  // Since the output of the getActors() happens to be an observable so we have to subscribe to it
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  // Function to delete an actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }

  ngOnInit() {
    this.onGetMovies();
  }

}
