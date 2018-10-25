import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-chat-tab',
  template: `
  <nav mat-tab-nav-bar backgroundColor="primary">
  <a mat-tab-link
    routerLink="./"
    routerLinkActive
    #chatsRla="routerLinkActive"
    [active]="chatsRla.isActive"
    [routerLinkActiveOptions]="{exact: true}">
      Chats
  </a>
  <a mat-tab-link
    routerLink="users"
    routerLinkActive
    #usersRla="routerLinkActive"
    [active]="usersRla.isActive">
      Users
  </a>
</nav>
<router-outlet></router-outlet>
  `
})
export class ChatTabComponent implements OnInit {

  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.startChatsMonitoring();
  }
}
