import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-delete-dialog-box',
  templateUrl: './delete-dialog-box.component.html',
  styleUrls: ['./delete-dialog-box.component.css']
})
export class DeleteDialogBoxComponent implements OnInit {

  employee: any;
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<DeleteDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employee = this.data;
   }

  ngOnInit(): void {
  }

  delete() {
    this.employeeService.deleteEmployee(this.data.id).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close(res);
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }

}
