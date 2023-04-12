import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  loggedin = false;
  error = false;

  checkLogin(employeeId: String, password: String): any {
    this.loginService.login(employeeId, password).subscribe((result) => {
      console.log(result);
      if (result.employee) {
        this.loginService.setLoggedIn(true);
        this.loginService.setEmployee(result.employee);
        this.setError(false);
        this.router.navigate(['/home']);
      } else {
        this.setError(true);
      }
    });
  }

  setError(value: boolean) {
    this.error = value;
  }
}
