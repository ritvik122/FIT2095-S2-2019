import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  }),
};

@Injectable({
  providedIn: 'root'
})

// All the functionalities provided by the application will be coded in side the DatabaseService class
export class DatabaseService {

  constructor(private http: HttpClient) {}

//////////////////// Function for actors //////////////////////

  // Functoin to retrieve all the actors (Here we are making a get request)
  getActors() {
    return this.http.get("/actors");
  }

  // Function to get the actor by its id (here we are making a get request)
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  // Function to create actors (here we are making a post request)
  // data is an object that contains the details of the new actor
  // httpOptions is an object that specifies a set of options for request such a format of the body
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }

  // Function to update the actor document in our database 
  // id: id of the actor , data: details of the update
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  // Function for deleting an actor
  deleteActor(id) {
    let url = "/actors/" + id;
    console.log(url)
    return this.http.delete(url, httpOptions);
  }
//////////////////// Function for movies //////////////////////

  // Function to retrieve all the actors (Here we are making a get request)
  getMovies() {
    return this.http.get("/movies");
  }

  // Function to create a movie
  createMovie(data) {
    return this.http.post("/movies", data, httpOptions);
  }

  // Function for deleting an actor
  deleteMovie(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }

  // Function to add specified actor to the actor array of the specified movie
  addTheActorToMovieArray(id) {
    let url = "/addSpecifiedActor/" + id;
  }

    // Function to update the movie document in our database 
  // id: id of the actor , data: details of the update
  updateMovie(id, data) {
    let url = "/movies/" + id;
    return this.http.put(url, data, httpOptions);
  }

}
