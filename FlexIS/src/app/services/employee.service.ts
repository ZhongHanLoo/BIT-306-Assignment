import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public addEmployee(employee: Employee): Observable<any> {
    employee.password = '123qwe'
    return this.http.post<any>(
      `http://localhost:3000/api/employee`,
      employee
    );
  }

  public getAllEmployee(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/employee`,
    );
  }

  public getEmployee(employee: Employee): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/employee/${employee._id}`,
    );
  }

  public updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/api/employee`,
      employee
    );
  }

  public deleteEmployee(employee: Employee): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3000/api/employee/${employee._id}`,
    );
  }

  public getSupervisorByDepartment(departmentId: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getSupervisorByDepartment/${departmentId}`,
    );
  }

  public getEmployeeById(employee: Employee): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getEmployeeById/${employee.employeeId}`,
    );
  }
}
