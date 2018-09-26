import { Component} from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {  

  constructor(private authService: AuthService) { 
      //super(authService, dialog);
    }

  onLogout(sidenav: MatSidenav): void {
    sidenav.close().then(() => this.authService.logout());
  }

}
