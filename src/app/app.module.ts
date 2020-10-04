import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthRepository } from '@app/core/repositories/auth.repository';
import { AuthAppRepository } from '@app/data/repository/auth-app-repository/auth-app.repository';
import { TheaterRepository } from '@app/core/repositories/theater.repository';
import { TheaterAppRepository } from '@app/data/repository/theater-app-repository/theater-app.repository';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { GraphQLModule } from '@app/graphql.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, GraphQLModule],
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthAppRepository,
    },
    {
      provide: TheaterRepository,
      useClass: TheaterAppRepository,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
