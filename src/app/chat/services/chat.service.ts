import { Injectable } from '@angular/core';
import { ChatModule } from '../chat.module';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat.model';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../../core/services/auth.service';
import { AllChatsQuery, USER_CHATS_QUERY } from './chat.graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: ChatModule
})
export class ChatService {

  constructor(private apollo: Apollo, private authService: AuthService) { }

  getUserChats(): Observable<Chat[]> {
    return this.apollo.query<AllChatsQuery>({
      query: USER_CHATS_QUERY,
      variables: { userID: this.authService.authUser.id }
    }).pipe(
      map(res => res.data.allChats)
    )
  }

}
