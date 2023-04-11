import { Employee } from "./employee";

export interface FwaRequest {
  _id: String;
  requestId: Number;
  requestDate: Date;
  workType: String;
  description: String;
  reason: String;
  status: String;
  comment: String;
  employee: Employee;
}
