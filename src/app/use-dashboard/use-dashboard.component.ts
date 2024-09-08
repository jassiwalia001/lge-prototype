import { Component, OnInit } from '@angular/core';
import { EmsService } from '../services/ems.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-use-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './use-dashboard.component.html',
  styleUrl: './use-dashboard.component.scss'
})
export class UseDashboardComponent implements OnInit {
  list: any = [];

  constructor(private emsService: EmsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchEnergyUsageList();
  }
  
  // Fetch the list of energy usage from Firebase
  fetchEnergyUsageList() {
    this.emsService.getEnergyUsage().subscribe((data) => {
      this.list = data;
    });
  }



  // Open dialog to add a new energy usage entry
  joinEV(row: any) {
    console.log(row)
    const inputParam = { ...row, users: [...(row.users || []), this.emsService.generateNewKey()] }
    console.log(row, inputParam)
      this.emsService.updateEnergyUsers(row.key, inputParam).then(() => {
        console.log('New energy usage entry added successfully');
        this.snackBar.open('User joined successfully', 'Close', { duration: 3000 });
      }).catch((error) => {
        console.error('Error adding new entry:', error);
      });
  }
}
