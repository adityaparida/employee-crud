import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-add-dialog-box',
  templateUrl: './add-dialog-box.component.html',
  styleUrls: ['./add-dialog-box.component.css']
})
export class AddDialogBoxComponent implements OnInit {

  employeeForm: FormGroup;
  employees: Employee = new Employee();
  employee: any;
  isSubmitted = false;
  @ViewChild('table') table: any;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<AddDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) { 
    this.employee = data;
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  addEmployee(): void {
    this.isSubmitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    this.employeeService.addEmployee(this.employeeForm.value).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close(res);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
