import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private appComponent: AppComponent) {}

  toggleSidenav() {
    if (this.appComponent.sidenav) {
      this.appComponent.sidenav.toggle();
    }
  }

}
