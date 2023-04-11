import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loggedin = false;

  employee = new BehaviorSubject<Employee>({
    _id: '6433da6bf60e9199ddc21265',
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

  public checkLogin(employeeId: String, password: String) {
    this.login(employeeId, password).subscribe((result) => {
      if (result) {
        this.loggedin = true;
        this.employee = result.employee;
        return true;
      } else {
        return false;
      }
    });
  }

  public getEmployee() {
    return this.employee.asObservable();
  }
}
