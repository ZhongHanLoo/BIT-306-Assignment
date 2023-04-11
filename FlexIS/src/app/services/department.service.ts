import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  public addDepartment(department: Department): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/api/department`,
      department
    );
  }

  public getAllDepartment(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/department`,
    );
  }

  public getDepartment(department: Department): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/department/${department._id}`,
    );
  }

  public updateDepartment(department: Department): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/api/department`,
      department
    );
  }

  public deleteDepartment(department: Department): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3000/api/department/${department._id}`,
    );
  }
}
