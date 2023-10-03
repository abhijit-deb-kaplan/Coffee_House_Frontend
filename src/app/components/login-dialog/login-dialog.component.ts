import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from '../../services/users/user-api.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatIconModule, MatButtonModule, MatSnackBarModule,MatProgressSpinnerModule],
})
export class LoginDialogComponent {
  email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  password = new FormControl('', [Validators.required]); 
  hide = true;
  loading = false;

  
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private http: HttpClient, private apiService: UserApiService, private snackBar: MatSnackBar) {}
  

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return `${this.getFieldName(control)} is required`;
    }
  
    return control.hasError('pattern') ? 'Not a valid email' : '';
  }

  getFieldName(control: FormControl): string {
    switch (control) {
      case this.email:
        return 'Email'
      case this.password:
        return 'Password'
      default:
        return 'Field';
    }
  }
  

  login(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
