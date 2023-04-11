import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailySchedule } from '../models/dailySchedule';

@Injectable({
  providedIn: 'root'
})
export class DailyScheduleService {

  constructor(private http: HttpClient) { }

  public addDailySchedule(dailySchedule: DailySchedule): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/api/dailySchedule`,
      dailySchedule
    );
  }

  public getAllDailySchedule(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/dailySchedule`,
    );
  }

  public getDailySchedule(dailySchedule: DailySchedule): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/api/dailySchedule/${dailySchedule._id}`,
    );
  }

  public updateDailySchedule(dailySchedule: DailySchedule): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/api/dailySchedule`,
      dailySchedule
    );
  }

  public deleteDailySchedule(dailySchedule: DailySchedule): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3000/api/dailySchedule/${dailySchedule._id}`,
    );
  }
}
