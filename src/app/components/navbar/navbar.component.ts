import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public dialog: MatDialog) {}

  openSignupDialog(): void {
     this.dialog.open(SignupDialogComponent, {
      width: '320px', 
    });
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '320px', 
    });
  }
}
