import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Director } from 'src/app/models/director-view-model';
import { MovieViewModel } from 'src/app/models/movie-view-model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-addeditmovie',
  templateUrl: './addeditmovie.component.html',
  styleUrls: ['./addeditmovie.component.css']
})
export class AddeditmovieComponent implements OnInit {
  movieId!: any;
  editMode = false;
  movieForm!: FormGroup;
  movie!: MovieViewModel;
  directors: Director[] = [];
  selectedDirector: string[] = []
  errMsg: string = "";
  constructor(private router: Router, private movieService: MovieService,
    private route: ActivatedRoute, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params);
          this.movieId = params['movieId'];
          this.editMode = params['movieId'] != null;
          this.initForm();
        }
      );
  }

  async getMovie(id: any) {
    await this.movieService.getMovie(this.movieId);
  }

  private async initForm() {

    let title = '';
    let year = '';
    let type = 'Action';
    let status = 'Public';
    let director: string[] = [];
    let imagePath = '';
    let trailerPath = '';

    if (this.editMode) {
      this.movieService.getMovie(this.movieId)
        .toPromise()
        .then((response: any) => {
          this.movie = response.movie;
          title = this.movie.title;
          year = this.movie.year;
          type = this.movie.type;
          status = this.movie.status;
          imagePath = this.movie.imagePath;
          trailerPath = this.movie.trailerPath;
          director = this.movie.director;

          this.initializeForm(title, year, type, status, director, imagePath, trailerPath);
        })
        .catch((error: any) => {

        });
    }

    this.movieService.getDirectors().subscribe({
      next: (response) => {
        response.map((item: any) => {
          var dic = new Director();
          dic.id = item._id;
          dic.name = item.name;
          this.directors.push(dic);
        })
      },
      error: (error) => {
        this.errMsg = error;
      }
    }
    )

    this.initializeForm(title, year, type, status, director, imagePath, trailerPath);

  }

  initializeForm(title: string, year: string, type: string, status: string,
    director: string[], imagePath: string, trailerPath: string) {
    this.movieForm = this.formbuilder.group({
      'title': new FormControl(title, Validators.required),
      'year': new FormControl(year, Validators.required),
      'type': new FormControl(type, Validators.required),
      'status': new FormControl(status, Validators.required),
      "imagePath": new FormControl(imagePath, Validators.required),
      "trailerPath": new FormControl(trailerPath, Validators.required),
      "director": new FormControl(director, Validators.required)
    });
  }

  onSubmit() {

    console.log(this.movieForm.value);
    if (!this.movieForm.valid) {
      this.errMsg = "Please input all required fields";
      return;
    }
    if (!this.editMode) {
      this.movieService.insertMovie(this.movieForm.value).subscribe((response) => {

        console.log(this.movieForm.value);
        this.router.navigateByUrl("/movies")
      }, (error) => {
        this.errMsg = "There is error when inserting";
      });
    }
    else {
      this.movieService.updateMovie(this.movieForm.value, this.movieId).subscribe((response) => {
       
        this.router.navigateByUrl("/movies")
      }, (error) => {
        this.errMsg = "There is error when updating";
      });
    }

  }

  onCancel() {
    this.router.navigateByUrl("/movies")
  }



  onDelete() {
    this.movieService.deleteMovie(this.movieId).subscribe((response) => {     
      this.router.navigateByUrl("/movie")
    }, (error) => {
      console.log(error);
    });
  }

}
