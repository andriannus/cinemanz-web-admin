import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
      provide: TheaterRepository,
      useClass: TheaterAppRepository,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
