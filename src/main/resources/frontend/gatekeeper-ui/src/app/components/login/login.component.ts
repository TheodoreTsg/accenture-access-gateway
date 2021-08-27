import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() submitForm = new EventEmitter();

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.valid) {
      this.submitForm.emit(this.loginForm.value);
    }
  }

}
