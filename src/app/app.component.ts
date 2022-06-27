import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AddDialogBoxComponent } from './dialog/add-dialog-box/add-dialog-box.component';
import { DeleteDialogBoxComponent } from './dialog/delete-dialog-box/delete-dialog-box.component';
import { UpdateDialogBoxComponent } from './dialog/update-dialog-box/update-dialog-box.component';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee-crud';
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'action'];
  employeeData: Employee[];
  @ViewChild(MatTable) table: MatTable<any>;
  employees: Employee = new Employee();

  constructor(
    private empService: EmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
    this.empService.getEmployees().subscribe(
      (data: any) => {
        this.employeeData = data;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogBoxComponent, {
      width: '500px',
      data: { name: this.employees.name, email: this.employees.email, phone: this.employees.phone, address: this.employees.address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empService.addEmployee(result).subscribe(
          (data: any) => {
            this.employeeData.push(data);
            window.location.reload();
            this.table.renderRows();
          });
      }
    });
  }

  update(employee: Employee) {
    const dialogRef = this.dialog.open(UpdateDialogBoxComponent, {
      width: '500px',
      data: { id: employee.id, name: employee.name, email: employee.email, phone: employee.phone, address: employee.address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empService.updateEmployee(result).subscribe(
          (data: any) => {
            this.employeeData = this.employeeData.filter((val, i) => {
              if (val.id === result.id) {
                this.employeeData[i] = result;
              }
              return true;
            }
            );
            this.table.renderRows();
          });
      }
    });
  }

  delete(employee: Employee) {
    const dialogRef = this.dialog.open(DeleteDialogBoxComponent, {
      width: '500px',
      data: { id: employee.id,  name: employee.name, email: employee.email, phone: employee.phone, address: employee.address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empService.deleteEmployee(result.id).subscribe(
          (data: any) => {
            this.employeeData = this.employeeData.filter(x => x.id !== data.id);
            this.table.renderRows();
          });
      }
    });
  }

}
