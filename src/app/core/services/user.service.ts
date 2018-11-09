import { User } from './../models/user.model';
import { QueryRef } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from '../models/user.model';
import { ALL_USERS_QUERY, AllUsersQuery, GET_USER_BY_ID_QUERY, UserQuery, NEW_USERS_SUBSCRIPTION } from './user.graphql';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private queryRef:QueryRef<AllUsersQuery>;

  users$: Observable<User[]>;
  private usersSubscription: Subscription;

  constructor(
    private apollo: Apollo
  ) { }

  startUsersMonitoring(idToExclude: string): void {
    if (!this.users$) {
      this.users$ = this.allUsers(idToExclude);
      this.usersSubscription = this.users$.subscribe();
    }
  }

  stopUsersMonitoring(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
      this.usersSubscription = null;
      this.users$ = null;
    }
  }

  allUsers(idToExclude: string):Observable<User[]> {
    this.queryRef =  this.apollo.watchQuery<AllUsersQuery>({
      query: ALL_USERS_QUERY,
      variables: {
        idToExclude
      }
    });
    this.queryRef.subscribeToMore({
      document: NEW_USERS_SUBSCRIPTION,
      updateQuery: (previous: AllUsersQuery, {subscriptionData}) : AllUsersQuery => {
        const newUser: User = subscriptionData.data.User.node;
        return {
          ...previous,
          allUsers: ([newUser, ...previous.allUsers]).sort((uA, uB) => {
            if(uA.name < uB.name) {return -1;}
            if(uA.name > uB.name) {return 1;}
            return 0;
          })
        };
      }
    });

    return this.queryRef.valueChanges.pipe(
      map(res => res.data.allUsers)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.apollo.query<UserQuery>({
      query: GET_USER_BY_ID_QUERY,
      variables: { userId: id }
    }).pipe(map(res => res.data.User));
  }
}