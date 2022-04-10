import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MovieService } from '../movies/movies.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  template: `
  <div class="container mt-4 bg-light shadow-lg p-3 mb-5 rounded justify-content-around w-50">
    <h2>Utente: {{ciaoUser}}</h2>
    <h3>Lista tu lista preferiti:</h3>
    <div *ngFor="let preferito of preferiti" class="w-100 row justify-content-between">
      <div class=" mt-4 light bg-dark shadow-lg p-3 mb-5 rounded w-75 text-light">
        <div class="list-group">
          <div><strong>{{preferito.title}}</strong></div>
          <p>{{preferito.overview}}</p>
        </div>
      </div>
      <div class="w-25 mt-4 shadow-lg mb-5 rounded ">
        <img class="img-fluid" srcset="http://image.tmdb.org/t/p/w500{{preferito.poster_path}}"/>
      </div>
      <hr />
    </div>
  </div>
  <router-outlet></router-outlet>
  `,
  styles: [],
})
export class FavouritesPage implements OnInit {
  ciaoUser!: string | undefined;
  users!: User[];
  preferiti = this.movieSrv.preferiti;
  constructor( private authSrv: AuthService, private movieSrv: MovieService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      this.ciaoUser = data?.user.name;
    })
  }
}
