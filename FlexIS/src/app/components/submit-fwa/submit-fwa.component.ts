import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FwaRequest } from 'src/app/models/fwaRequest';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { FwaRequestService } from 'src/app/services/fwa-request.service';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-submit-fwa',
  templateUrl: './submit-fwa.component.html',
  styleUrls: ['./submit-fwa.component.css'],
})
export class SubmitFWAComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private fwaRequestService: FwaRequestService,
    private loginService: LoginService
  ) {}

  workTypes: String[] = ['flexi-hour', 'work-from-home', 'hybrid'];

  newRequest: FwaRequest = {
    _id: '',
    requestId: 0,
    requestDate: new Date(),
    workType: '',
    description: '',
    reason: '',
    status: 'pending',
    comment: '',
    employee: {
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
    },
  };


  displayedColumns: String[] = ['requestId', 'date', 'workType', 'status'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  descriptionFormControl = new FormControl('', [Validators.required]);
  reasonFormControl = new FormControl('', [Validators.required]);

  subscription!: Subscription;
  fwaRequestList: any;
  employee: any;
  test:any;

  ngOnInit(): void {
    this.subscription = this.loginService.getEmployee().subscribe((result) => {
      this.newRequest.employee = result
      console.log(result._id)
      this.fwaRequestService
        .getFwaRequestByEmployee(result._id)
        .subscribe((result2) => {
          console.log(result2);
          this.fwaRequestList = result2.fwaRequests;
          this.dataSource = new MatTableDataSource<any>(this.fwaRequestList);
          this.dataSource.paginator = this.paginator;
        });
    });

    this.fwaRequestService.getAllFwaRequest().subscribe((result)=>{
      console.log(result.fwaRequest.length)
      this.newRequest.requestId = result.fwaRequest.length + 1;
      console.log(this.newRequest.requestId)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  confirmRequest(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Submit Request Confirmation',
        message: 'Are you sure you want to submit request?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.submitRequest();
      }
    });
  }

  submitRequest() {
    this.fwaRequestService
      .addFwaRequest(this.newRequest)
      .subscribe((result) => {
        console.log(result);
        this.refresh();
        this.snackbar.open('FWA Request submitted Successfully', 'X', {
          duration: 3000,
        });
      });
  }

  refresh() {
    this.ngOnInit();
    this.newRequest = {
      _id: '',
      requestId: 0,
      requestDate: new Date(),
      workType: '',
      description: '',
      reason: '',
      status: 'pending',
      comment: '',
      employee: {
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
      },
    };
    this.descriptionFormControl.reset();
    this.reasonFormControl.reset();
  }
}
