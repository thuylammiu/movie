import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, Subject } from 'rxjs';
import { MovieViewModel } from '../models/movie-view-model';
import { ReviewViewModel } from '../models/review-view-model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  error = new Subject<string>();


  private apiUrl = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private httpClient: HttpClient) { }

  getDirectors(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "/directors", { headers: this.headers });
  }

  getAllMoives(pageIndex: number = 0, limit: number = 4): Observable<any> {

    return this.httpClient.get<any>(this.apiUrl + "/movies?pageNo=" + pageIndex + "&limit=" + limit, { headers: this.headers });
  }

  insertMovie(movie: MovieViewModel): Observable<MovieViewModel> {
    return this.httpClient.post<MovieViewModel>(this.apiUrl + "/create", movie, { headers: this.headers });
  }

  getMovie(movieId: any): Observable<MovieViewModel> {
    return this.httpClient.get<MovieViewModel>(this.apiUrl + "/update/" + movieId, { headers: this.headers });
  }

  updateMovie(movie: MovieViewModel, movieId: any): Observable<MovieViewModel> {
    return this.httpClient.put<MovieViewModel>(this.apiUrl + "/update/" + movieId, movie, { headers: this.headers });
  }

  updateStatus(movie: MovieViewModel, movieId: any): Observable<MovieViewModel> {
    return this.httpClient.patch<MovieViewModel>(this.apiUrl + "/updatestatus/" + movieId, movie, { headers: this.headers });
  }

  deleteMovie(movieId: any): Observable<string> {
    return this.httpClient.delete<string>(this.apiUrl + "/remove/" + movieId, { headers: this.headers });
  }

  getReviews(movieId: any): Observable<ReviewViewModel[]> {
    return this.httpClient.get<ReviewViewModel[]>(this.apiUrl + "/reviews/" + movieId, { headers: this.headers });
  }

  addReview(review: ReviewViewModel, movieId: string): Observable<ReviewViewModel> {
    return this.httpClient.post<ReviewViewModel>(this.apiUrl + "/review/" + movieId, review, { headers: this.headers });
  }
}
