import { Department } from './department';

export interface Employee {
  id: String;
  password: String;
  name: String;
  position: String;
  email: String;
  fwaStatus: String;
  department: Department;
}
