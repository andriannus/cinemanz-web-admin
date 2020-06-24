import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/shared/guards/auth/auth.guard';
import { NotAuthGuard } from '@app/shared/guards/auth/not-auth.guard';

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
    canLoad: [AuthGuard],
  },
  {
    path: 'movie',
    loadChildren: () => {
      return import('@app/pages/movie/movie.module').then(m => m.MovieModule);
    },
    canLoad: [AuthGuard],
  },
  {
    path: 'theater',
    loadChildren: () => {
      return import('@app/pages/theater/theater.module').then(
        m => m.TheaterModule,
      );
    },
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => {
      return import('@app/pages/login/login.module').then(m => m.LoginModule);
    },
    canLoad: [NotAuthGuard],
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
