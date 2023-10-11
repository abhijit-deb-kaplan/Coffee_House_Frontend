import { MatSnackBar } from '@angular/material/snack-bar';

export interface ISnackbarData {
  message: string;
  action: string;
  icon: string;
  snackbar: MatSnackBar;
  class: string;
}
