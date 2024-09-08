import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmsService } from '../services/ems.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { EnergyUsageTableComponent } from '../energy-usage-table/energy-usage-table.component';
import { UseDashboardComponent } from '../use-dashboard/use-dashboard.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EnergyUsageTableComponent,
    UseDashboardComponent,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  form: FormGroup;

  constructor(
    private emsService: EmsService, public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      userType: ['admin'] // or a default value like '1'
    });
  }
  
  ngOnInit() {
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
}
