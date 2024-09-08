import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmsService } from '../services/ems.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-energy-usage-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './energy-usage-table.component.html',
  styleUrl: './energy-usage-table.component.scss'
})
export class EnergyUsageTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'usage', 'maxUsers', 'users', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private emsService: EmsService, public dialog: MatDialog,
    private snackBar: MatSnackBar ) {}

  ngOnInit() {
    this.fetchEnergyUsageList();
  }

  // Fetch the list of energy usage from Firebase
  fetchEnergyUsageList() {
    this.emsService.getEnergyUsage().subscribe((data) => {
      this.dataSource.data = data;
      console.log(data)
    });
  }


  // Open dialog to add a new energy usage entry
  openAddDialog(row?: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: { ...row } // Empty data for a new entry
    });

    // Save the new data to Firebase when dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let key = row ? row.key : this.emsService.generateNewKey();
        console.log(result, row, key)
        this.emsService.updateEnergyUsage(key, result).then((data) => {
          console.log('New energy usage entry added successfully', data);
          this.snackBar.open('Entry updated successfully', 'Close', { duration: 3000 });
        }).catch((error) => {
          console.error('Error adding new entry:', error);
        });
      }
    });
  }

  deleteEnergyUsage(row: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(row)
        this.emsService.deleteEnergyUsage(row.key).then(() => {
          console.log('Energy usage entry deleted successfully');
          this.snackBar.open('Entry deleted successfully', 'Close', { duration: 3000 });
          this.fetchEnergyUsageList(); // Refresh the table data
        }).catch((error) => {
          console.error('Error deleting energy usage:', error);
          this.snackBar.open('Error deleting entry', 'Close', { duration: 3000 });
        });
      }
    });
  }
}
