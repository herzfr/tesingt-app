import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from '../home.service';
import { DetailComponent } from './dialog/detail/detail.component';
import { UpdateComponent } from './dialog/update/update.component';
import { Employee, EmployeeDto } from './employee.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'group',
    'description',
    'listAction',
  ];
  dataSource!: MatTableDataSource<Employee>;

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  isLoadingAction = false;

  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _homeService: HomeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDataEmpl();
  }

  openDialog(data: any, is: boolean): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { employee: data, from: is };
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.disableClose = true;
    dialogConfig.minWidth = '200px';
    dialogConfig.maxHeight = '90vh';

    const dialogRef = this.dialog.open(UpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.getDataEmpl();
      }
    });
  }

  openDetailDialog(data: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.disableClose = true;
    dialogConfig.minWidth = '250px';
    dialogConfig.maxHeight = '90vh';

    const dialogRef = this.dialog.open(DetailComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.getDataEmpl();
      }
    });
  }

  getDataEmpl() {
    this.dataSource = new MatTableDataSource();
    this.isLoadingResults = true;
    this._homeService.getAllEmpl().subscribe((res) => {
      this.isLoadingResults = false;

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  convertToCurrenct(val: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  }

  action(act: string, data: Employee | null) {
    console.log(act);
    switch (act) {
      case 'edit':
        this.openDialog(data, false);
        break;
      case 'new':
        this.openDialog(new EmployeeDto(), false);
        break;
      case 'detail':
        this.openDialog(data, false);
        break;
      default:
        this.deleteEmpl(data?.id ?? 0);
        break;
    }
  }

  deleteEmpl(id: number) {
    this._homeService.deleteEmplId(id).subscribe(
      () => {
        alert('delete employee success');
        this.getDataEmpl();
      },
      (error) => alert('delete employee error' + error)
    );
  }
}
