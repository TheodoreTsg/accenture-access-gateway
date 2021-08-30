import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
  }

  displayDynamicErrorMessage(reason: any) {
    this._snackBar.open(reason.error.message, 'Close', {duration: 5000});
  }
}
