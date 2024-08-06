import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieViewModel } from 'src/app/models/movie-view-model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent implements OnInit{

  movies: MovieViewModel[]=[];
  constructor(private movieService:MovieService) {

  }
  searchMovies()
  {
    
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {  
     
    this.movieService.getAllMoives(0,0).subscribe(
      (response: any) =>
      {     
       console.log(response.movies);
        this.movies = response.movies;         
      }
      
    );
  }
}
