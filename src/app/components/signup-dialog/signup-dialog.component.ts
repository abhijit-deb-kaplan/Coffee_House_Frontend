import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserApiService } from '../../services/users/user-api.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatIconModule, MatButtonModule, MatSnackBarModule,MatProgressSpinnerModule],
 
})
export class SignupDialogComponent {

  firstName = new FormControl('', [Validators.required]); 
  lastName = new FormControl('', [Validators.required]); 
  email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  password = new FormControl('', [Validators.required]); 
  hide = true;
  loading = false;

  constructor(public dialogRef: MatDialogRef<SignupDialogComponent>, private snackBar: MatSnackBar, private apiService: UserApiService, ) {}

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return `${this.getFieldName(control)} is required`;
    }
  
    return control.hasError('pattern') ? 'Not a valid email' : '';
  }
  
  getFieldName(control: FormControl): string {
    switch (control) {
      case this.firstName:
        return 'First Name';
      case this.lastName:
        return 'Last Name';
      case this.email:
        return 'Email'
      case this.password:
        return 'Password'
      default:
        return 'Field';
    }
  }

  areAllFieldsFilled(): boolean {
    return this.firstName.valid && this.lastName.valid && this.email.valid && this.password.valid;
  }

  signup(): void {
    console.log('Signing up...');
    console.log('Signing up...');
    console.log('First Name:', this.firstName.value);
    console.log('Last Name:', this.lastName.value);
    console.log('Email:', this.email.value);
    console.log('Password:', this.password.value);
    
    if (this.firstName.valid && this.lastName.valid && this.email.valid && this.password.valid) {
      console.log('All fields are valid. Proceeding with signup...');
  
      this.loading = true;
  
      // signup data send to backend using the HttpClient
      const signupData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
      };
  
      this.apiService.signup(signupData)
        .subscribe(
          (response) => {
            console.log('Signup successful:', response);
            this.snackBar.open('Signup successful!', 'Close', {duration: 3000, horizontalPosition: 'end', verticalPosition: 'top'});
            this.loading = false;
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error during signup:', error);
            this.loading = false;
  
            if (error.status === 0) {
              this.snackBar.open('Server is busy. Please try again later.', 'Close', { duration: 5000, horizontalPosition: 'end', verticalPosition: 'top' });
            } else if (error.status === 400 && error.error && error.error.error === 'Email already exists') {
              this.snackBar.open('Email already exists!', 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top'  });
            } else {
              this.snackBar.open('Signup failed!', 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top'  });
            }
          }
        );
    } else {
      console.log('Please fill in all fields before signing up.');
      this.snackBar.open('Please fill in all fields before signing up.', 'Close', {duration: 3000, horizontalPosition: 'end', verticalPosition: 'top'});
    }
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

}
