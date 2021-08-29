import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AccessService} from '../../services/access.service';
import {Authenticated} from '../../shared/models/models';

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

  constructor(
    private accessService: AccessService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let loginParam = '1';
      loginParam = loginParam + '#' + this.loginForm.value.username + ':' + this.loginForm.value.password;
      console.log('loginParam', btoa(loginParam));
      this.accessService.access(btoa(loginParam)).subscribe(
        (data: Authenticated) => {
          alert(data.authenticated);
        }
      );
    }
  }
}
