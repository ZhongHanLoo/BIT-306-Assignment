import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FwaRequestService } from 'src/app/services/fwa-request.service';

@Component({
  selector: 'app-review-fwa',
  templateUrl: './review-fwa.component.html',
  styleUrls: ['./review-fwa.component.css']
})
export class ReviewFWAComponent implements OnInit{

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private fwaRequestService: FwaRequestService,
  ) {}

  pendingList: any;
  acceptedList: any;
  rejectedList: any;

  pendingDisplayedColumns: String[] = ['requestId', 'date', 'workType', 'employee', 'action'];
  pendingDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) PendingMatPaginator!: MatPaginator;

  acceptedDisplayedColumns: String[] = ['requestId', 'date', 'workType', 'employee', 'action'];
  acceptedDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) AcceptedMatPaginator!: MatPaginator;

  rejectedDisplayedColumns: String[] = ['requestId', 'date', 'workType', 'employee', 'action'];
  rejectedDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) RejectedMatPaginator!: MatPaginator;

  ngOnInit(): void {

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

  getSelectedFwaRequest(request: any ){

  }

}
