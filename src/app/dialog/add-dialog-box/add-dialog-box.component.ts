import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-add-dialog-box',
  templateUrl: './add-dialog-box.component.html',
  styleUrls: ['./add-dialog-box.component.css']
})
export class AddDialogBoxComponent implements OnInit {

  employees: Employee = new Employee();
  employee: any;
  isSubmitted = false;
  @ViewChild('table') table: any;

  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<AddDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) { 
    this.employee = data;
  }

  ngOnInit(): void {
  }

  addEmployee(employeeForm): void {
    this.isSubmitted = true;
    if (employeeForm.invalid) {
      return;
    }
    this.employeeService.addEmployee(this.employee).subscribe(
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
