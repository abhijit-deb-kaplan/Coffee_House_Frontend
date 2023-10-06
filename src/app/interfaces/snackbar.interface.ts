import { MatSnackBar } from "@angular/material/snack-bar";

export interface SnackbarData {
    message: string;
    action: string;
    icon: string;
    snackbar: MatSnackBar
}