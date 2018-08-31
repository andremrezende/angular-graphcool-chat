import { GRAPHCOOL_CONFIG, GraphcoolConfig } from './core/providers/graphcool-config.providers';
import { environment } from "./../environments/environment";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { NgModule, Inject } from "@angular/core";
import { ApolloModule, Apollo } from "apollo-angular";
import { ApolloLink, Operation } from "apollo-link";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { StorageKeys } from "./storage-keys";

@NgModule({
  imports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class ApolloConfigModule {
  constructor(private apollo: Apollo, 
    @Inject(GRAPHCOOL_CONFIG) private graphcoolConfig: GraphcoolConfig,
    private httpLink: HttpLink) {
    const http = httpLink.create({
      uri: this.graphcoolConfig.simpleAPI
    });
    const authMiddleware: ApolloLink = new ApolloLink((operation: Operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}`
        })
      });
      return forward(operation);
    });

    const linkError = onError(({ graphQLErrors, networkError }) => {
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });
    apollo.create({
      link: ApolloLink.from([
        linkError,
        authMiddleware.concat(http)
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: !environment.production
    });
  }

  private getAuthToken(): string {
    return window.localStorage.getItem(StorageKeys.AUTH_TOKEN);
  }
}
