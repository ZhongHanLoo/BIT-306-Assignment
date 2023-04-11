import { Injectable } from '@angular/core';
import { FwaRequest } from '../models/fwaRequest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class FwaRequestService {

  constructor(private http: HttpClient) { }

  public addFwaRequest(fwaRequest: FwaRequest): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/api/fwaRequest`,
      fwaRequest
    );
  }

  public getAllFwaRequest(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/fwaRequest`,
    );
  }

  public getFwaRequest(fwaRequest: FwaRequest): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/fwaRequest/${fwaRequest._id}`,
    );
  }

  public updateFwaRequest(fwaRequest: FwaRequest): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/api/fwaRequest`,
      fwaRequest
    );
  }

  public deleteFwaRequest(fwaRequest: FwaRequest): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3000/api/fwaRequest/${fwaRequest._id}`,
    );
  }

  public getFwaRequestByEmployee(employee_id: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getFwaRequestByEmployee/${employee_id}`,
    );
  }

  // public getNewestFwaRequest(): Observable<any> {
  //   return this.http.get<any>(
  //     `http://localhost:3000/api/getNewestFwaRequest`,
  //   );
  // }

  public getPendingFwaRequestForSupervisor(employee_id: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getPendingFwaRequestForSupervisor/${employee_id}`,
    );
  }

  public getAcceptedFwaRequestForSupervisor(employee_id: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getAcceptedFwaRequestForSupervisor/${employee_id}`,
    );
  }

  public getRejectedFwaRequestForSupervisor(employee_id: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getRejectedFwaRequestForSupervisor/${employee_id}`,
    );
  }

  public getDepartmentFlexiHours(department_id: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getDepartmentFlexiHours/${department_id}`,
    );
  }

  public getDepartmentWorkFromHome(department_id: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getDepartmentWorkFromHome/${department_id}`,
    );
  }

  public getDepartmentHybrid(department_id: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getDepartmentHybrid/${department_id}`,
    );
  }

  public getDepartmentRequest(department_id: String): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/getDepartmentRequest/${department_id}`,
    );
  }
}
