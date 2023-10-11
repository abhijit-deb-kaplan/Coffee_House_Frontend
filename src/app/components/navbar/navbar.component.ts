import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { IUser } from 'src/app/interfaces/users.interface';
import { UserApiService } from 'src/app/services/users/user-api.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() isAuthenticated: boolean;

  @Output() loginRequested = new EventEmitter<void>();
  @Output() logoutRequested = new EventEmitter<void>();

  user: IUser | null = null;
  email = '';
  firstName = '';
  lastName = '';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private customSnackbar: SnackbarService,
    private authService: AuthServiceService,
    private userService: UserApiService
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    try {
      this.userService.user$.subscribe((user) => {
        this.user = user;
      });
      this.user = userData ? JSON.parse(userData) : null;
    } catch (error) {
      this.user = null;
    }
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  openSignupDialog(): void {
    this.dialog.open(SignupDialogComponent, {
      width: '380px',
    });
  }

  logout(): void {
    this.logoutRequested.emit();
    this.userService.updateUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }
}
