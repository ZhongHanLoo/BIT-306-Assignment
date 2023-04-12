import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    private loginService: LoginService,
  ) {}

  subscription!: Subscription;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  employee:any;

  ngOnInit(): void {
    this.subscription = this.loginService.getEmployee().subscribe((result)=>{
      this.employee = result;
    })

  }

  toggle() {
    this.sidenav.toggle();
  }

}
