import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Route[] = [
  {
    path: 'favourites',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components/favourites/favourites.module').then((film) => film.UsersModule),
  },
  {
    path: 'movies',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components/movies/movies.module').then(
        (film) => film.MoviesModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
