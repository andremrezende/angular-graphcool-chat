import { AUTHENTICATE_USER_MUTATION, SIGNUP_USER_MUTATION } from './auth.graphql';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) {
    this.signupUser({name: 'Versailles', email: 'versailles@test.com', password: '123456'}).subscribe(res => console.log(res));
   }

  signinUser(variables: {email: string, password: string}): Observable<{id:string, token:string}> {
    return this.apollo.mutate({
      mutation: AUTHENTICATE_USER_MUTATION,
      variables
    }).pipe(
      map (res=> res.data.authenticateUser)
    );
  }

  signupUser(variables: {name: string, email: string, password: string}): Observable<{id:string, token:string}> {
    return this.apollo.mutate({
      mutation: SIGNUP_USER_MUTATION,
      variables
    }).pipe(
      map (res=> res.data.signupUser)
    );
  }
}
