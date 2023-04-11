import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  departments: Department[] = [];
  newUser: Employee = {
    _id: '',
    employeeId: '',
    password: '',
    name: '',
    position: '',
    email: '',
    fwaStatus: 'New',
    department: { _id: '', departmentId: '', name: '' },
    userType: '',
    supervisingEmployee: [],
    fwaRequestList: [],
    dailyScheduleList: [],
  };

  employeeList: any;
  supervisorList!: Employee[];
  selectedSupervisor: Employee = {
    _id: '',
    employeeId: '',
    password: '',
    name: '',
    position: '',
    email: '',
    fwaStatus: 'New',
    department: { _id: '', departmentId: '', name: '' },
    userType: '',
    supervisingEmployee: [],
    fwaRequestList: [],
    dailyScheduleList: [],
  };

  displayedColumns: String[] = ['employeeId', 'name', 'email', 'department', 'position'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  employeeIdFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  positionFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.departmentService.getAllDepartment().subscribe((result) => {
      this.departments = result.departments;
    });

    this.employeeService.getAllEmployee().subscribe((result) => {
      this.employeeList = result.employees;
      this.dataSource = new MatTableDataSource<any>(this.employeeList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDepartmentChange() {
    this.employeeService
      .getSupervisorByDepartment(this.newUser.department._id)
      .subscribe((result) => {
        console.log(result);
        this.supervisorList = result.employees;
      });
  }

  confirmRegister(event: Event) {
    event.preventDefault();
    if (this.selectedSupervisor._id === '') {
      this.newUser.userType = 'Supervisor';
    } else {
      this.newUser.userType = 'Employee';
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Register Confirmation',
        message: 'Are you sure you want to register new employee?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.register();
      }
    });
  }

  register() {
    this.employeeService.addEmployee(this.newUser).subscribe((result) => {
      if (this.selectedSupervisor._id !== '') {
        this.updateSupervisor(result.employee).then((theSupervisor) => {
          this.employeeService
            .updateEmployee(theSupervisor)
            .subscribe((employeeUpdate) => {
              console.log(employeeUpdate);
            });
        });
      }
      this.refresh();
      this.snackbar.open('Employee Registered Successfully', 'X', {
        duration: 3000,
      });
    });
  }

  async updateSupervisor(employee: any) {
    this.selectedSupervisor.supervisingEmployee.push(employee);
    return this.selectedSupervisor;
  }

  refresh() {
    this.ngOnInit();
    this.newUser = {
      _id: '',
      employeeId: '',
      password: '',
      name: '',
      position: '',
      email: '',
      fwaStatus: 'New',
      department: { _id: '', departmentId: '', name: '' },
      userType: '',
      supervisingEmployee: [],
      fwaRequestList: [],
      dailyScheduleList: [],
    };
    this.selectedSupervisor = {
      _id: '',
      employeeId: '',
      password: '',
      name: '',
      position: '',
      email: '',
      fwaStatus: '',
      department: { _id: '', departmentId: '', name: '' },
      userType: '',
      supervisingEmployee: [],
      fwaRequestList: [],
      dailyScheduleList: [],
    };
    this.employeeIdFormControl.reset();
    this.nameFormControl.reset();
    this.positionFormControl.reset();
    this.emailFormControl.reset();
  }
}
