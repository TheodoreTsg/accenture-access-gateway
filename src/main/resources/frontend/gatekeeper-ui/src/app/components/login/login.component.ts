import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AccessService} from '../../services/access.service';
import {Authenticated} from '../../shared/models/models';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {error} from 'protractor';
import {throwError} from 'rxjs';
import {ActivatedRoute, Route, Router} from '@angular/router';

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
  level = '';

  constructor(
    private accessService: AccessService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.level = this.route.snapshot.queryParams['Level'];
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let loginParam = this.level + '#' + this.loginForm.value.username + ':' + this.loginForm.value.password;
      this.accessService.access(btoa(loginParam)).subscribe(
        (data: Authenticated) => {
          if(data) {
            this.router.navigateByUrl('home');
            this.openSnackBar('Authentication Successful!', 'Close');
          }
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 5000});
  }
}
