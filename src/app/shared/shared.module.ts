import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NoRecordComponent } from './components/no-record/no-record.component';
import {
  MatButtonModule,
  MatCardModule, 
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatListModule,
  MatIconModule,
  MatLineModule,
  MatSidenavModule,
  MatTabsModule
  } from '@angular/material';

@NgModule({
 imports: [MatIconModule], 
 exports: [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatLineModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  NoRecordComponent,
  ReactiveFormsModule
 ],
 declarations: [NoRecordComponent]
})
export class SharedModule { }
