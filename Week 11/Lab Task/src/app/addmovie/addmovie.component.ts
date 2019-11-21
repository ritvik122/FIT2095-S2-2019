import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent {

  moviesDB: any[] = [];
  movieFullName: string = "";
  productionYear: number = 0;

  constructor(private dbService: DatabaseService, private router: Router) { }

  // Function to save all the actors in a database
  // Since the output of the getActors() happens to be an observable so we have to subscribe to it
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
      this.router.navigate(["/listmovies"]);
    });
  }

  // Function to save the actor
  // On saving the current actor, we are calling the onGetActors function to display all the actors in the table format
  onSaveMovie() {
    let obj = {
      title: this.movieFullName,
      year: this.productionYear
    };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

}
