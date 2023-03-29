import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private http: HttpClient, private departmentService: DepartmentService){}

  id: String | undefined;
  name: String | undefined;

  department: Department = {departmentId: '', name:''}



  createDepartment(){
    this.departmentService.addDepartment(this.department).subscribe({next: (result) => {
      console.log(result);


    },});
  }


  getAllEmployee(){
    //this.http.get<{message: string, posts: Employee[]}>('http://localhost:3000/api/posts').subscribe((postData) => {

    //})
  }

}
