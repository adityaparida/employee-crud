import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AddDialogBoxComponent } from './dialog/add-dialog-box/add-dialog-box.component';
import { DeleteDialogBoxComponent } from './dialog/delete-dialog-box/delete-dialog-box.component';
import { UpdateDialogBoxComponent } from './dialog/update-dialog-box/update-dialog-box.component';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

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
  @ViewChild('content') content: ElementRef;

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
          });
          this.getEmployee();
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
            this.getEmployee();
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
          });
          this.getEmployee();
      }
    });
  }

  exportAsPdf() {
    let doc: any = document.getElementById('content');
    html2canvas(doc).then(canvas => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      let imgData = canvas.toDataURL('image/png', 1.0);
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, fileWidth, fileHeight);
      pdf.save('employee-list.pdf');
    });
  }

  exportAsExcel() {
    this.empService.exportAsExcelFile(this.employeeData, 'employee-list');
  }

}
