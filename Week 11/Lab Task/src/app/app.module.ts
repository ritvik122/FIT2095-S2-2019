import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ListactorsComponent } from "./listactors/listactors.component";
import { AddactorComponent } from "./addactor/addactor.component";
import { DeleteactorComponent } from "./deleteactor/deleteactor.component";
import { UpdateactorComponent } from "./updateactor/updateactor.component";
import { RouterModule, Routes } from "@angular/router";
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { AddActorToMovieComponent } from './add-actor-to-movie/add-actor-to-movie.component';
import { ViewnotfoundComponent } from './viewnotfound/viewnotfound.component';
import { DeleteAllActorsAndMoviesComponent } from './delete-all-actors-and-movies/delete-all-actors-and-movies.component';
const appRoutes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "listmovies", component: ListmoviesComponent},
  {path: "addmovie", component: AddmovieComponent},
  {path: "deletemovies", component: DeletemovieComponent},
  {path: "addactortomovie", component: AddActorToMovieComponent},
  {path:"deleteAllActorsAndMovies", component: DeleteAllActorsAndMoviesComponent},
  {path: "", redirectTo: "/listactors", pathMatch: "full" },
  {path: "**", component: ViewnotfoundComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    AddmovieComponent,
    DeletemovieComponent,
    ListmoviesComponent,
    AddActorToMovieComponent,
    ViewnotfoundComponent,
    DeleteAllActorsAndMoviesComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash:true}),
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}