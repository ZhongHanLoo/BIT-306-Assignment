import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private appComponent: AppComponent,
    private loginService: LoginService
  ) {}

  toggleSidenav() {
    if (this.appComponent.sidenav) {
      this.appComponent.sidenav.toggle();
    }
  }

  logout() {
    this.loginService.logout();
  }
}
