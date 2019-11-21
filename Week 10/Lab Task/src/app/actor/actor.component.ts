import {
  Component,
  OnInit
} from '@angular/core';
import {
  DatabaseService
} from "../database.service";
import {
  stringify
} from 'querystring';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  section = 1;
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  movieFullName: string = "";
  productionYear: number = 0;
  fullName: string = "";
  bYear: number = 0;
  actorId;
  movieId;
  deleteYear: number = 0;
  nameOfTheMovie: string = "";
  nameOfTheActor: string = "";


  constructor(private dbService: DatabaseService) {}

  ngOnInit() {}

  // Function to change the value of the section variable
  changeSection(sectionId) {
    this.section = sectionId;
  }

  ////////////////////////////////////// Functions for the actors ////////////////////////////////////

  // Function to save all the actors in a database
  // Since the output of the getActors() happens to be an observable so we have to subscribe to it
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Function to save the actor
  // On saving the current actor, we are calling the onGetActors function to display all the actors in the table format
  onSaveActor() {
    let obj = {
      name: this.fullName,
      bYear: this.bYear
    };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Function to get all the details of the selected actor and assign those details to the global variable
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  // Function to update the details of the selected actor
  onUpdateActor() {
    let obj = {
      name: this.fullName,
      bYear: this.bYear
    };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Function to delete an actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  // Function to reset the values of all the variables
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }

  ////////////////////////////////////// Functions for the Movies ////////////////////////////////////

  // Function to save all the actors in a database
  // Since the output of the getActors() happens to be an observable so we have to subscribe to it
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
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

  // Function to delete an actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  // Function to delete a year produced before the specified year
  deleteAsPerSpecificYear() {
    let idCollection = [];

    // Getting the ids of all those movies which are to be deleted
    for (let i = 0; i < this.moviesDB.length; i++) {
      if (this.moviesDB[i].year < this.deleteYear) {
        idCollection.push(this.moviesDB[i].year);
      }
    }

    // Deleting all those movies produced before the speicified year
    let totalLength = idCollection.length;
    for (let j = 0; j < totalLength; j++) {
      let currentMovieYear = idCollection[j];
      for (let k = 0; k < this.moviesDB.length; k++) {
        if (this.moviesDB[k].year === currentMovieYear) {
          this.onDeleteMovie(this.moviesDB[k]);
          break;
        }
      }
    }
  }

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
        this.onGetMovies();
      });
    } else {
      alert("Invalid Actor/Movie entered !");
    }
  }

    // Function to add Actor to Movie
    addMovieToActor() {

      let firstFlag = false;
      let actorIndex = 0;
      let movieIndex = 0;
      // Checking whether the given movie exist or not
      for (let j = 0; j < this.actorsDB.length; j++) {
        if (this.nameOfTheActor === this.actorsDB[j].name) {
          actorIndex = j;
          for (let i = 0; i < this.moviesDB.length; i++) {
            if (this.nameOfTheMovie === this.moviesDB[i].title) {
              movieIndex = i;
              firstFlag = true;
              break;
            }
          }
        }
      }
  
      if (firstFlag === true) {
        this.actorsDB[actorIndex].movies.push(this.moviesDB[movieIndex]._id);
        this.dbService.updateActor(this.actorsDB[actorIndex]._id, this.actorsDB[actorIndex]).subscribe(result => {
          this.onGetActors();
        });
      } else {
        alert("Invalid Actor/Movie entered !");
      }
    }

}
