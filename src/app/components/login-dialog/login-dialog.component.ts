import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { UserApiService } from '../../services/users/user-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { UserLoginResponse } from '../../interfaces/users.interface';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginDialogComponent {
  @Output() loginSuccess = new EventEmitter<UserLoginResponse['user']>();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  hidePassword = true;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
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
      case this.loginForm.get('email'):
        return 'Email';
      case this.loginForm.get('password'):
        return 'Password';
      default:
        return 'Field';
    }
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.customSnackbar.openErrorSnackbar(
        'Please fill in both email and password',
        'Close'
      );
      return;
    }

    this.loading = true;


    this.apiService.login(this.loginForm.value).subscribe(
      (response: UserLoginResponse) => {
        this.customSnackbar.openSuccessSnackbar('Login successful!', 'Close');
        this.loading = false;
        this.apiService.onSuccessfulLogin(response.user);
        this.loginSuccess.emit(response.user);

        this.dialogRef.close({
          name: 'dummy',
          passowrd: 'fake-pass',
        });
      },

      (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 0) {
          this.customSnackbar.openErrorSnackbar(
            'Server is busy. Please try again later',
            'Close'
          );
        } else {
          this.customSnackbar.openErrorSnackbar(
            'Login failed! Invalid credentials',
            'Close'
          );
        }
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
