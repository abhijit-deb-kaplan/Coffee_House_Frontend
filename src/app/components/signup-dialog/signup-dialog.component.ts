import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { UserApiService } from '../../services/users/user-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { UserSignupResponse } from '../../interfaces/users.interface';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupDialogComponent {


  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl(null, [Validators.required]),
  });

  hidePassword = true;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    private apiService: UserApiService,
    private customSnackbar: SnackbarService
  ) {}

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return `${this.getFieldName(control)} is required`;
    }

    return control.hasError('pattern') ? 'Not a valid email' : '';
  }

  getFieldName(control: AbstractControl): string {
    switch (control) {
      case this.signupForm.get('firstName'):
        return 'First Name';
      case this.signupForm.get('lastName'):
        return 'Last Name';
      case this.signupForm.get('email'):
        return 'Email';
      case this.signupForm.get('password'):
        return 'Password';
      default:
        return 'Field';
    }
  }

  signup(): void {
    if (this.signupForm.valid) {
      console.log('All fields are valid. Proceeding with signup...');

      this.loading = true;

      // Calling Api for signup
      this.apiService.signup(this.signupForm.value).subscribe(
        (response: UserSignupResponse) => {
          this.customSnackbar.openSuccessSnackbar(
            'Signup successful!',
            'Close'
          );
          this.loading = false;
          this.dialogRef.close();
        },
        (error: HttpErrorResponse) => {
          this.loading = false;

          if (error.status === 0) {
            // Error if server is closed or not active
            this.customSnackbar.openErrorSnackbar(
              'Server is busy. Please try again later.',
              'Close'
            );
          } else if (
            // Error if email already exists
            error.status === 400 &&
            error.error &&
            error.error.error === 'Email already exists'
          ) {
            this.customSnackbar.openErrorSnackbar(
              'Email already exists!',
              'Close'
            );
          } else {
            // Any other error
            this.customSnackbar.openErrorSnackbar('Signup failed!', 'Close');
          }
        }
      );
    } else {
      this.customSnackbar.openErrorSnackbar(
        'Please fill in all fields before signing up.',
        'Close'
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
