import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';
import { ChatService } from '../../services/chat.service';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent extends BaseComponent<Chat> implements OnInit {
  chats$: Observable<Chat[]>;
  constructor(private authService: AuthService, private chatService: ChatService) { 
    super();
  }

  ngOnInit() {
    this.chats$ = this.chatService.chats$;
  }

  getChatTitle(chat: Chat): string {
    return chat.title || chat.users[0].name;
  }

  getLastMessage(chat: Chat): string {
    const message:Message = chat.messages[0];
    if (message) {
      const sender = (message.sender.id === this.authService.authUser.id) ? 'You' : message.sender.name;
      return `${sender}: ${message.text}`;
    }
    return 'No messages';
  }
}
