import { Component, OnInit } from '@angular/core';
import { MovieViewModel } from 'src/app/models/movie-view-model';
import { MovieService } from 'src/app/services/movie.service';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  isError: boolean = false;
  errorMsg: string = '';
  limit: number = 4;
  pageIndex: number = 0;
  searchText: string = '';
  totalRecord: number = 0;
  numberOfPage: number = 0;
  arrPage: number[] = [];
  movies: MovieViewModel[] = [];
  constructor(private movieService: MovieService, private router: Router) {

  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.pageIndex = 1;
    this.getMovies();
  }

  getMovies() {
    this.arrPage = [];
    this.movieService.getAllMoives(this.pageIndex, this.limit).subscribe(
      (response: any) => {
        console.log(response);
        this.movies = response.movies;
        this.totalRecord = parseInt(response.totalRecord);
        this.numberOfPage = Math.floor(this.totalRecord / this.limit);


        for (let i = 0; i < this.numberOfPage; i++) {
          this.arrPage.push(i);
        }
      }

    );
  }

  addMoive() {
    this.router.navigateByUrl("/add")
  }



  onSearch() {
    alert("search");
    this.movies = this.movies.filter(item => item.title.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  onPageIndexChange(index: number = 0) {

    if (index >= 0)
      this.pageIndex = index
    this.getMovies();
  }

  onPagePrev() {

    if (this.pageIndex > 0)
      this.pageIndex = this.pageIndex - 1;

    this.getMovies();
  }

  onPageNext() {
    debugger;
    if (this.pageIndex < this.numberOfPage)
      this.pageIndex = this.pageIndex + 1;

    this.getMovies();
  }
}
