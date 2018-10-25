import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from '../models/user.model';
import { ALL_USERS_QUERY, AllUsersQuery, GET_USER_BY_ID_QUERY, UserQuery } from './user.graphql';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    return this.apollo.query<AllUsersQuery>({
      query: ALL_USERS_QUERY,
      variables: {
        idToExclude
      }
    }).pipe(
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