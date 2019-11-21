import {
  Component,
  OnInit
} from '@angular/core';
import {
  DatabaseService
} from "../database.service";
import {
  Router
} from "@angular/router";

@Component({
  selector: 'app-add-actor-to-movie',
  templateUrl: './add-actor-to-movie.component.html',
  styleUrls: ['./add-actor-to-movie.component.css']
})
export class AddActorToMovieComponent implements OnInit {

  private moviesDB: any[] = [];
  private nameOfTheMovie: string = "";
  private actorsDB: any[] = [];
  private nameOfTheActor: string = "";

  constructor(private dbService: DatabaseService, private router: Router) {}

  // Function to add Actor to Movie
  addActorToMovie() {

    let firstFlag = false;
    let movieIndex = 0;
    let actorIndex = 0;
    // Checking whether the given movie exist or not
    for (let j = 0; j < this.moviesDB.length; j++) {
      if (this.nameOfTheMovie === this.moviesDB[j].title) {
        movieIndex = j;
        for (let i = 0; i < this.actorsDB.length; i++) {
          if (this.nameOfTheActor === this.actorsDB[i].name) {
            actorIndex = i;
            firstFlag = true;
            break;
          }
        }
      }
    }

    if (firstFlag === true) {
      this.moviesDB[movieIndex].actors.push(this.actorsDB[actorIndex]._id);
      this.dbService.updateMovie(this.moviesDB[movieIndex]._id, this.moviesDB[movieIndex]).subscribe(result => {
        alert("Success !");
        this.onGetMovies();
      });
    } else {
      alert("Invalid Actor/Movie entered !");
    }
  }

  // Function to save all the actors in a database
  // Since the output of the getActors() happens to be an observable so we have to subscribe to it
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  // Function to save all the actors in a database
  // Since the output of the getActors() happens to be an observable so we have to subscribe to it
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }

}
