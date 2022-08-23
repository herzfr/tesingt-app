import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';
import { Employee } from '../../employee.interface';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  form!: FormGroup;
  employee: Employee;
  payLoad = '';

  isNew = false;
  status = ['ACTIVE', 'INACTIVE'];
  groups = ['FRONTEND', 'BACKEND', 'OTHER'];

  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private homeService: HomeService
  ) {
    this.employee = data['employee'];
    this.isNew = data['from'];
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.employee.id),
      username: new FormControl(this.employee.username, Validators.required),
      firstName: new FormControl(this.employee.firstName, Validators.required),
      lastName: new FormControl(this.employee.lastName, Validators.required),
      email: new FormControl(this.employee.email, Validators.required),
      birthDate: new FormControl(this.employee.birthDate, Validators.required),
      basicSalary: new FormControl(
        this.employee.basicSalary,
        Validators.required
      ),
      status: new FormControl(this.employee.status, Validators.required),
      group: new FormControl(this.employee.group, Validators.required),
      description: new FormControl(new Date()),
    });
  }

  get username() {
    return this.form.get('username');
  }
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get birthDate() {
    return this.form.get('birthDate');
  }
  get basicSalary() {
    return this.form.get('basicSalary');
  }
  get statusE() {
    return this.form.get('status');
  }
  get group() {
    return this.form.get('group');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    if (this.isNew) {
      this.homeService.createEmpl(this.payLoad).subscribe(
        () => {
          alert('create employee success');
          this.dialogRef.close(true);
        },
        (error) => alert('create employee error' + error)
      );
    } else {
      this.homeService
        .updateEmpl(this.payLoad, this.form.get('id')?.value)
        .subscribe(
          () => {
            alert('update employee success');
            this.dialogRef.close(true);
          },
          (error) => alert('update employee error' + error)
        );
    }
  }
}
