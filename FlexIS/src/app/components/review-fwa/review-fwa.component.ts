import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';
import { FwaRequest } from 'src/app/models/fwaRequest';
import { FwaRequestService } from 'src/app/services/fwa-request.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-review-fwa',
  templateUrl: './review-fwa.component.html',
  styleUrls: ['./review-fwa.component.css'],
})
export class ReviewFWAComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private fwaRequestService: FwaRequestService,
    private loginService: LoginService
  ) {}

  //theEmployee: any;
  isExpanded = true;
  subscription!: Subscription;
  pendingList: any;
  acceptedList: any;
  rejectedList: any;
  selectedRequest: FwaRequest = {
    _id: '',
    requestId: 0,
    requestDate: new Date(),
    workType: '',
    description: '',
    reason: '',
    status: '',
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
  acceptedRequest: FwaRequest = {
    _id: '',
    requestId: 0,
    requestDate: new Date(),
    workType: '',
    description: '',
    reason: '',
    status: '',
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
  rejectedRequest: FwaRequest = {
    _id: '',
    requestId: 0,
    requestDate: new Date(),
    workType: '',
    description: '',
    reason: '',
    status: '',
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

  pendingDisplayedColumns: String[] = [
    'requestId',
    'date',
    'workType',
    'employee',
    'action',
  ];
  pendingDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) PendingMatPaginator!: MatPaginator;

  acceptedDisplayedColumns: String[] = [
    'requestId',
    'date',
    'workType',
    'employee',
    'action',
  ];
  acceptedDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) AcceptedMatPaginator!: MatPaginator;

  rejectedDisplayedColumns: String[] = [
    'requestId',
    'date',
    'workType',
    'employee',
    'action',
  ];
  rejectedDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) RejectedMatPaginator!: MatPaginator;

  ngOnInit(): void {
    this.subscription = this.loginService.getEmployee().subscribe((result) => {
      this.fwaRequestService
        .getPendingFwaRequestForSupervisor(result._id)
        .subscribe((request) => {
          this.pendingList = request.fwaRequests;
          this.pendingDataSource = new MatTableDataSource<any>(
            this.pendingList
          );
          this.pendingDataSource.paginator = this.PendingMatPaginator;
        });

      this.fwaRequestService
        .getAcceptedFwaRequestForSupervisor(result._id)
        .subscribe((request) => {
          this.acceptedList = request.fwaRequests;
          this.acceptedDataSource = new MatTableDataSource<any>(
            this.acceptedList
          );
          this.acceptedDataSource.paginator = this.AcceptedMatPaginator;
        });

      this.fwaRequestService
        .getRejectedFwaRequestForSupervisor(result._id)
        .subscribe((request) => {
          this.rejectedList = request.fwaRequests;
          this.rejectedDataSource = new MatTableDataSource<any>(
            this.rejectedList
          );
          this.rejectedDataSource.paginator = this.RejectedMatPaginator;
        });
    });
  }

  applyFilterPending(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pendingDataSource.filter = filterValue.trim().toLowerCase();
    if (this.pendingDataSource.paginator) {
      this.pendingDataSource.paginator.firstPage();
    }
  }
  applyFilterAccepted(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.acceptedDataSource.filter = filterValue.trim().toLowerCase();
    if (this.acceptedDataSource.paginator) {
      this.acceptedDataSource.paginator.firstPage();
    }
  }
  applyFilterRejected(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rejectedDataSource.filter = filterValue.trim().toLowerCase();
    if (this.rejectedDataSource.paginator) {
      this.rejectedDataSource.paginator.firstPage();
    }
  }

  getSelectedFwaRequest(request: any) {
    this.selectedRequest = { ...request };
  }

  showAcceptedFwaRequest(request: any) {
    this.acceptedRequest = { ...request };
  }

  showRejectedFwaRequest(request: any) {
    this.rejectedRequest = { ...request };
  }

  confirmAccept(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to accept request?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.acceptRequest();
      }
    });
  }

  confirmReject(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to reject request?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rejectRequest();
      }
    });
  }

  acceptRequest() {
    this.selectedRequest.status = 'accepted';
    this.fwaRequestService
      .updateFwaRequest(this.selectedRequest)
      .subscribe((result) => {
        console.log(result);
        this.refresh();
        this.snackbar.open('FWA Request Accepted', 'X', {
          duration: 3000,
        });
      });
  }

  rejectRequest() {
    this.selectedRequest.status = 'rejected';
    this.fwaRequestService
      .updateFwaRequest(this.selectedRequest)
      .subscribe((result) => {
        console.log(result);
        this.refresh();
        this.snackbar.open('FWA Request Rejected', 'X', {
          duration: 3000,
        });
      });
  }

  refresh() {
    this.ngOnInit();
    this.selectedRequest = {
      _id: '',
      requestId: 0,
      requestDate: new Date(),
      workType: '',
      description: '',
      reason: '',
      status: '',
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
    this.acceptedRequest = {
      _id: '',
      requestId: 0,
      requestDate: new Date(),
      workType: '',
      description: '',
      reason: '',
      status: '',
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
    this.rejectedRequest = {
      _id: '',
      requestId: 0,
      requestDate: new Date(),
      workType: '',
      description: '',
      reason: '',
      status: '',
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
  }
}
