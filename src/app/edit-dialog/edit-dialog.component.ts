import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EmsService } from '../services/ems.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  form: FormGroup;
  energyData: any[] = [];
  backupAlerts: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Data passed to dialog
    private fb: FormBuilder,
    private emsService: EmsService
  ) {
    // Initialize the reactive form
    this.form = this.fb.group({
      name: new FormControl(this.data.name || ''),
      maxUsers: new FormControl(this.data.maxUsers || []),
      status: new FormControl(this.data.status || true),
      essMode: new FormControl(this.data.essMode),
      usage: new FormControl(this.data.usage || 50), // Default to 50 if not provided
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'kwh';
    }

    return `${value}`;
  }

  // Save the form values (including charging speed) back to Firebase
  onSave() {
    if (this.form.valid) {
      const updatedData = {...this.form.value, users: this.data.users || []};
      this.dialogRef.close(updatedData); 
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
