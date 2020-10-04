import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

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
    canLoad: [AuthGuard],
    loadChildren() {
      return import('@app/pages/dashboard/dashboard.module').then(
        module => module.DashboardModule,
      );
    },
  },
  {
    path: 'movie',
    loadChildren() {
      return import('@app/pages/movie/movie.module').then(
        module => module.MovieModule,
      );
    },
    canLoad: [AuthGuard],
  },
  {
    path: 'theater',
    canLoad: [AuthGuard],
    loadChildren() {
      return import('@app/presentation/theater/theater.module').then(
        module => module.TheaterModule,
      );
    },
  },
  {
    path: 'login',
    canLoad: [NotAuthGuard],
    loadChildren() {
      return import('@app/presentation/login/login.module').then(
        module => module.LoginModule,
      );
    },
  },
  {
    path: '**',
    loadChildren() {
      return import('@app/pages/not-found/not-found.module').then(
        module => module.NotFoundModule,
      );
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
