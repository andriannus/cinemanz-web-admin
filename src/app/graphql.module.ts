import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DefaultOptions } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import { AUTH } from '@app/shared/constants/auth.constant';
import { GRAPHQL_URI } from '@app/shared/constants/config.constant';

export function apolloProvider(httpLink: HttpLink) {
  const auth = setContext(() => {
    return {
      headers: {
        'cinemanz-token': localStorage.getItem(AUTH.token) || '',
      },
    };
  });

  const cache = new InMemoryCache();

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  const link = ApolloLink.from([
    auth,
    httpLink.create({
      uri:
        process.env.NODE_ENV === 'production'
          ? GRAPHQL_URI.prod
          : GRAPHQL_URI.dev,
    }),
  ]);

  return { cache, defaultOptions, link };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloProvider,
      deps: [HttpLink],
    },
  ],
  exports: [ApolloModule, HttpLinkModule],
})
export class GraphQLModule {}
