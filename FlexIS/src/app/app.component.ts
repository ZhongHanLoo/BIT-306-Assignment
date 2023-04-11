import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginService } from './auth/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  title = 'FlexIS';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;
  subscription!: Subscription;
  loggedIn = false;

  ngOnInit(): void {
    this.subscription = this.loginService.getLoggedIn().subscribe((result) => {
      this.loggedIn = result;
    });
  }
}
