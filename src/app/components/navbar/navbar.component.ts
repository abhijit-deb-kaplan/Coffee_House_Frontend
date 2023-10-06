import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  @Input() isAuthenticated: boolean = false;
  @Input() username: string = '';
  @Output() loginRequested = new EventEmitter<void>();
  @Output() logoutRequested = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  openSignupDialog(): void {
     this.dialog.open(SignupDialogComponent, {
      width: '380px', 
    });
  }

  openLoginDialog(): void {
    this.loginRequested.emit()
  }

  logout() {
    this.logoutRequested.emit()
  }
}