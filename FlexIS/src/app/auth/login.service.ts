import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  private loggedin = new BehaviorSubject<boolean>(false);

  employee = new BehaviorSubject<Employee>({
    //_id: '6433da6bf60e9199ddc21265',//employee
    _id: '', //supervisor
    employeeId: '',
    password: '',
    name: '',
    position: '',
    email: '',
    fwaStatus: 'New',
    department: { _id: '', departmentId: '', name: '' },
    userType: '',
    supervisingEmployee: [],
    fwaRequestList: [],
    dailyScheduleList: [],
  });

  public login(employeeId: String, password: String): Observable<any> {
    const authData = { employeeId, password };
    return this.http.post<any>(`http://localhost:3000/api/login`, authData);
  }

  // public checkLogin(employeeId: String, password: String): any {
  //   this.login(employeeId, password).subscribe((result) => {
  //     if (result) {
  //       this.loggedin = true;
  //       this.employee = result.employee;
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // }

  public getEmployee() {
    return this.employee.asObservable();
  }

  public setEmployee(data: Employee) {
    this.employee.next(data);
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedin.asObservable();
  }

  setLoggedIn(loggedInValue: boolean) {
    this.loggedin.next(loggedInValue);
  }

  logout() {
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
