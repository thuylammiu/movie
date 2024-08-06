import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NarbarComponent } from './components/narbar/narbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';
import { AddeditmovieComponent } from './components/movie/addeditmovie/addeditmovie.component';
import { MovieItemComponent } from './components/movie/movie-item/movie-item.component';
import { UserMovieListComponent } from './components/userview/user-movie-list/user-movie-list.component';
import { UserMovieDetailComponent } from './components/userview/user-movie-detail/user-movie-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NarbarComponent,
    LoginComponent,
    SignupComponent,
    MovieListComponent,
    AddeditmovieComponent,
    MovieItemComponent,
    UserMovieListComponent,
    UserMovieDetailComponent,      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
