import { Employee } from "./employee";

export interface DailySchedule {
  _id: String;
  scheduleId: Number;
  date: Date;
  workLocation: String;
  workHours: String;
  workReport: String;
  supervisorComment: String;
  employee: Employee;
}
