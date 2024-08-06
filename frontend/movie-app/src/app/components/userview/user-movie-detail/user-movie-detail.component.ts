import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MovieViewModel } from 'src/app/models/movie-view-model';
import { ReviewViewModel } from 'src/app/models/review-view-model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-user-movie-detail',
  templateUrl: './user-movie-detail.component.html',
  styleUrls: ['./user-movie-detail.component.css']
})
export class UserMovieDetailComponent {
  @ViewChild('f')
  signupForm!: NgForm;
  selectedStarValue: string = '1';
  validationError: string = '';
  moviedId: string = "";
  reviews: ReviewViewModel[] = [];
  movie!: MovieViewModel;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {

  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onBack() {
    this.router.navigateByUrl("/user-movies");
  }
  ngOnInit(): void {
    this.moviedId = this.route.snapshot.params["movieId"];
    this.loadMovie();
    this.loadReview();
  }

  loadMovie() {
    this.movieService.getMovie(this.moviedId).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.movie = response.movie;
        },
        error: (error) => {
          console.log(error);
        }
      },

    )
  }

  loadReview() {
    this.reviews = [];
    this.movieService.getReviews(this.moviedId).subscribe(
      {
        next: (response) => {
          response.map(item => {
            let review = new ReviewViewModel()
            review.name = item.name;
            review.email = item.email;
            review.rating = item.rating;
            review.content = item.content;
            review.avatar = this.getRandomNumber(4, 10);
            this.reviews.push(review);
          })

        },
        error: (error) => {
          console.log(error);
        }

      }
    )
  }

  onSubmit() {
    debugger;
    if (!this.signupForm.valid) {
      this.validationError = "Please input all required fields";
    }
    else {
      let review = new ReviewViewModel();
      review.name = this.signupForm.value.name;
      review.email = this.signupForm.value.email;
      review.rating = this.selectedStarValue;
      review.content = this.signupForm.value.content;
      this.movieService.addReview(review, this.moviedId).subscribe(
        {
          next: () => {
            this.validationError = "";
            this.selectedStarValue = "1";
            this.signupForm.reset();
            this.loadReview();
          },
          error: (error) => {
            console.log(error);
          }

        }
      )

    }
    return false;
  }
}
