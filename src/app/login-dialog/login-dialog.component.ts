import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatIconModule, MatButtonModule],
})
export class LoginDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]); 
  hide = true;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  login(): void {
    console.log('Logging in...');
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.dialogRef.close();
  }
}
