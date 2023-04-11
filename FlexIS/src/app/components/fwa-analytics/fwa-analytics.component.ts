import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';
import { DepartmentService } from 'src/app/services/department.service';
import { FwaRequestService } from 'src/app/services/fwa-request.service';

@Component({
  selector: 'app-fwa-analytics',
  templateUrl: './fwa-analytics.component.html',
  styleUrls: ['./fwa-analytics.component.css'],
})
export class FwaAnalyticsComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private departmentService: DepartmentService,
    private fwaRequestService: FwaRequestService
  ) {}

  subscription!: Subscription;
  employee: any;

  selectedDepartment: Analytic = {
    _id: '',
    departmentId: '',
    name: '',
    flexiHours: 0,
    workFromHome: 0,
    hybrid: 0,
  };

  displayedColumns: String[] = [
    'departmentId',
    'name',
    'flexiHours',
    'workFromHome',
    'hybrid',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  requestDisplayedColumns: String[] = [
    'requestId',
    'date',
    'workType',
    'employee',
    'status',
  ];
  requestDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) RequestMatPaginator!: MatPaginator;

  ngOnInit(): void {
    this.getAnalytics();
    this.subscription = this.loginService.getEmployee().subscribe((result) => {
      this.employee = result;
      if (this.employee.userType !== 'Admin') {
        this.fwaRequestService
          .getDepartmentRequest(this.employee.department)
          .subscribe((result) => {
            console.log(result);
            this.requestDataSource = new MatTableDataSource<any>(
              result.fwaRequests
            );
            this.requestDataSource.paginator = this.paginator;
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterRequest(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.requestDataSource.filter = filterValue.trim().toLowerCase();
    if (this.requestDataSource.paginator) {
      this.requestDataSource.paginator.firstPage();
    }
  }

  getAnalytics() {
    this.departmentService.getAllDepartment().subscribe((departments) => {
      let analytics: Analytic[] = [];
      for (let department of departments.departments) {
        let analytic: Analytic = {
          _id: department._id,
          departmentId: department.departmentId,
          name: department.name,
          flexiHours: 0,
          workFromHome: 0,
          hybrid: 0,
        };
        this.fwaRequestService
          .getDepartmentFlexiHours(department._id)
          .subscribe((result) => {
            analytic.flexiHours = result.fwaRequests.length;
          });
        this.fwaRequestService
          .getDepartmentWorkFromHome(department._id)
          .subscribe((result) => {
            analytic.workFromHome = result.fwaRequests.length;
          });
        this.fwaRequestService
          .getDepartmentHybrid(department._id)
          .subscribe((result) => {
            analytic.hybrid = result.fwaRequests.length;
          });
        analytics.push(analytic);
      }
      this.dataSource = new MatTableDataSource<any>(analytics);
      this.dataSource.paginator = this.paginator;
    });
  }

  getSelectedDepartment(department: any) {
    this.selectedDepartment = { ...department };
    this.fwaRequestService
      .getDepartmentRequest(this.selectedDepartment._id)
      .subscribe((result) => {
        console.log(result);
        this.requestDataSource = new MatTableDataSource<any>(
          result.fwaRequests
        );
        this.requestDataSource.paginator = this.paginator;
      });
  }
}

interface Analytic {
  _id: String;
  departmentId: String;
  name: String;
  flexiHours: Number;
  workFromHome: Number;
  hybrid: Number;
}
