import { Component} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  private authService: AuthService;

  constructor() { }

  onLogout(sidenav: MatSidenav): void {
    sidenav.close().then(() => this.authService.logout());
  }

}
