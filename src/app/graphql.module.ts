import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { GRAPHQL_URI } from '@app/shared/constants/config.constant';

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri:
              process.env.NODE_ENV === 'production'
                ? GRAPHQL_URI.prod
                : GRAPHQL_URI.dev,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  exports: [ApolloModule, HttpLinkModule],
})
export class GraphQLModule {}
