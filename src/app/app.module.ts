import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { GraphQLModule } from '@app/graphql.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, GraphQLModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
