import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AvatarComponent } from './components/avatar/avatar.component';
import { FromNowPipe } from './pipes/from-now.pipe';

@NgModule({
 imports: [CommonModule, MatIconModule], 
 exports: [
  AvatarComponent,
  CommonModule,
  FormsModule,
  FromNowPipe,
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
 declarations: [AvatarComponent, NoRecordComponent, FromNowPipe]
})
export class SharedModule { }
