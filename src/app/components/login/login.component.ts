import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  error = '';
  loginData;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = '/profile';
    this.authService.logout();
  }


  // A simple get method to get access to form controls
  get myForm() { return this.loginForm.controls; }

  login() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      const user = this.authService.login(this.loginForm.value).subscribe(
        data => {
          if (data) {
            this.loginData = data;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', this.loginData.token);
            localStorage.setItem('user', JSON.stringify(this.loginData.user));
            this.router.navigate([this.returnUrl]);
          } else {
            this.message = 'Please check your credentials and retry.';
          }
        },
        error => {
          this.message = 'No such user.';
          alert('No such user.')
        }
      );
    }
  }
}
