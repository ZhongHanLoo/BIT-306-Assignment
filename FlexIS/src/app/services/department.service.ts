import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  public addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(
      `http://local:3000/api/department`,
      department
    );
  }
}
