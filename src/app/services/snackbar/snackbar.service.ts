import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSuccessSnackbar(message: string, action: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message,
        action,
        icon: 'done',
        snackbar: this.snackBar,
        class: 'success-snackbar',
      },
      panelClass: 'success-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  openErrorSnackbar(message: string, action: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message,
        action,
        icon: 'report_problem',
        snackbar: this.snackBar,
        class: 'error-snackbar',
      },
      panelClass: 'error-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
