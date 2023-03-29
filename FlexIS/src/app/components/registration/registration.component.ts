import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private http: HttpClient){}

  getAllEmployee(){
    //this.http.get<{message: string, posts: Employee[]}>('http://localhost:3000/api/posts').subscribe((postData) => {

    //})
  }

}
