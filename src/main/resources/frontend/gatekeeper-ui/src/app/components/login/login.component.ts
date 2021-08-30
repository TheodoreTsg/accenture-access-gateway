import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AccessService} from '../../services/access.service';
import {Authenticated} from '../../shared/models/models';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {error} from 'protractor';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() submitForm = new EventEmitter();

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  usernameError = 'You must enter a Username!';
  passwordError = 'You must enter a Password!';
  hide = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private accessService: AccessService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let loginParam = '1';
      loginParam = loginParam + '#' + this.loginForm.value.username + ':' + this.loginForm.value.password;
      this.accessService.access(btoa(loginParam)).subscribe(
        (data: Authenticated) => {
          this.openSnackBar('Authentication Successful!', 'Close');
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 5000});
  }
}
