import { DailySchedule } from './dailySchedule';
import { Department } from './department';
import { FwaRequest } from './fwaRequest';

export interface Employee {
  _id: String;
  employeeId: String;
  password: String;
  name: String;
  position: String;
  email: String;
  fwaStatus: String;
  department: Department;
  userType: String;
  supervisingEmployee: Employee[];
  fwaRequestList: FwaRequest[];
  dailyScheduleList: DailySchedule[];
}
