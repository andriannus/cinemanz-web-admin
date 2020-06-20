import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => {
      return import('@app/pages/dashboard/dashboard.module').then(
        m => m.DashboardModule,
      );
    },
  },
  {
    path: 'movie',
    loadChildren: () => {
      return import('@app/pages/movie/movie.module').then(m => m.MovieModule);
    },
  },
  {
    path: 'theater',
    loadChildren: () => {
      return import('@app/pages/theater/theater.module').then(
        m => m.TheaterModule,
      );
    },
  },
  {
    path: 'login',
    loadChildren: () => {
      return import('@app/pages/login/login.module').then(m => m.LoginModule);
    },
  },
  {
    path: '**',
    loadChildren: () => {
      return import('@app/pages/not-found/not-found.module').then(
        m => m.NotFoundModule,
      );
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
