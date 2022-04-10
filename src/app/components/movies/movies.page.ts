import { Component, OnInit } from '@angular/core';
import { MovieService } from './movies.service';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <div class="container">
      <div class="caricamento text-center">
        <div *ngIf="isLoading" class="spinner-grow text-dark" style="width: 25px; height: 25px" role="status"></div>
        <div *ngIf="isLoading" class="spinner-grow text-dark" style="width: 25px; height: 25px" role="status"></div>
        <div *ngIf="isLoading" class="spinner-grow text-dark" style="width: 25px; height: 25px" role="status"></div>
        <h3 id="caricamento" *ngIf="isLoading">Caricamento...</h3>
      </div>
      <div class="row justify-content-around ">
        <div *ngFor="let movie of movies" class="card text-center m-2 p-2 shadow-lg p-3 mb-5 rounded">
          <img class="img-fluid" srcset="http://image.tmdb.org/t/p/w500{{movie.poster_path}}"/>
          <div class="card-body">
            <h2 class="card-title text-light"><strong>{{ movie.title }}</strong></h2>
            <h3 class="text-light">Rilasciato il: <strong>{{ movie.release_date }}</strong></h3>
            <h5 class="text-light">Lingua originale: <strong>{{ movie.original_language }}</strong></h5>
            <h3 class="text-light">Voto medio: <strong>{{ movie.vote_average }}</strong></h3>
          </div>
          <p *ngIf="!movie.like" (click)="miPiace(movie)">👌</p>
        </div>
      </div>
    </div>

  `,
  styles: [
    `
    .card{
      width: 20%;
      border-radius: 10px;
    }
    p{
      font-size: 30px;
      cursor: pointer;
      height: 20px;
      width: 20px;
    }
    img{
      border-radius: 10px;
    }
  `],
})
export class MoviesPage implements OnInit {
  constructor(private movieSrv: MovieService, private http: HttpClient) {}
  movies: Movie[] | undefined;
  isLoading= false


  ngOnInit(): void {
    this.isLoading=true
    setInterval(() => {
      this.movies = this.movieSrv.movies;
      this.isLoading= false;
    }, 2000);
    if(!this.movies){
      this.movieSrv.getMovies()
    }
  }

  miPiace(movie: Movie) {
    this.movieSrv.addFavorite(movie);
  }

}
