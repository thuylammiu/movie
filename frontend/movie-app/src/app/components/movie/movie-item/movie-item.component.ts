import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieViewModel } from 'src/app/models/movie-view-model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: MovieViewModel
  status: boolean = false
  constructor(private router: Router, private movieService: MovieService) { }

  onEditClick(event: any) {
    this.router.navigateByUrl("/edit/" + this.movie.id);

  }

  ngOnInit(): void {
    this.status = (this.movie.status == "Public");
  }

  onStatusChange() {

    let movie = new MovieViewModel();
    movie.status = (this.status == true) ? "Public" : "Private"
    this.movieService.updateStatus(movie, this.movie.id).subscribe(
      {
        next: () => alert("Update status successfully.")
      }
    )
  }


  onDelete() {
    if (confirm("Do you want to delete?")) {
      this.movieService.deleteMovie(this.movie.id).subscribe({
        next: () => {
          window.location.reload();
        }
      });

    }

  }
}
