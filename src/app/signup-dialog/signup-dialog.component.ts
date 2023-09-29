import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatIconModule, MatButtonModule],
 
})
export class SignupDialogComponent {
  firstName = new FormControl('', [Validators.required]); 
  lastName = new FormControl('', [Validators.required]); 
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]); 
  hide = true;

  constructor(public dialogRef: MatDialogRef<SignupDialogComponent>) {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signup(): void {
    console.log('Signing up...');
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
