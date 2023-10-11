import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ISnackbarData } from 'src/app/interfaces/snackbar.interface';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public snackBarData: ISnackbarData) {}

  closeSnackbar() {
    this.snackBarData.snackbar.dismiss();
  }
}
