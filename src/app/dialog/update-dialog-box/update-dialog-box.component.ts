import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-update-dialog-box',
  templateUrl: './update-dialog-box.component.html',
  styleUrls: ['./update-dialog-box.component.css']
})
export class UpdateDialogBoxComponent implements OnInit {

  employee: any;
  @ViewChild('table') table: any;
  
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<UpdateDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employee = new Employee();
    this.employee.id = data.id;
    this.employee.name = data.name;
    this.employee.email = data.email;
    this.employee.phone = data.phone;
    this.employee.address = data.address;
   }

  ngOnInit(): void {
  }

  update() {
    this.employeeService.updateEmployee(this.employee).subscribe(
      (data: any) => {
        // window.location.reload();
        this.dialogRef.close(data);
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }

}
