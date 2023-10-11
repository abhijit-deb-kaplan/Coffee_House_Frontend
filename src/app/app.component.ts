import { Component } from '@angular/core';
import { UserApiService } from './services/users/user-api.service';
import { SnackbarService } from './services/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { IUserLoginResponse } from './interfaces/users.interface';
import { AuthServiceService } from './services/authService/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userFromDialog: IUserLoginResponse['user'];

  title = 'Coffee_House_Frontend';
  isAuthenticated = this.authService.isAuthenticated();
  email: string = '';

  constructor(
    private userData: UserApiService,
    public customSnackbar: SnackbarService,
    public authService: AuthServiceService,
    private dialog: MatDialog
  ) {
    this.userData.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.userData.email$.subscribe((email) => {
      this.email = email;
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '380px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userFromDialog = result.user;
      }
    });
  }

  logout() {
    this.userData.logout({ email: this.email }).subscribe(
      (response: any) => {
        // If successfully logs out
        this.userData.onSuccessfulLogout();
        this.userData.customSnackbar.openSuccessSnackbar(
          'Logged Out Successfully',
          'Close'
        );
      },
      (err: any) => {
        if (err.status === 0) {
          // If any network error
          this.userData.customSnackbar.openErrorSnackbar(
            'Network Error',
            'Okay'
          );
        } else {
          // Other error
          this.userData.customSnackbar.openErrorSnackbar(
            err.error.message,
            'Okay'
          );
        }
      }
    );
  }
}
