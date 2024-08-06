import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';
import { AddeditmovieComponent } from './components/movie/addeditmovie/addeditmovie.component';
import { UserMovieDetailComponent } from './components/userview/user-movie-detail/user-movie-detail.component';
import { UserMovieListComponent } from './components/userview/user-movie-list/user-movie-list.component';


import { AuthGuard } from './services/auth.guard';

const routes: Routes = [  
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "movie", component: MovieListComponent  },
  { path: "add", component: AddeditmovieComponent  },
  { path: "edit/:movieId", component: AddeditmovieComponent },
  { path: "movies", component: MovieListComponent  },
  { path: "user-movies", component: UserMovieListComponent },
  { path: "user-movies-detail/:movieId", component: UserMovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
