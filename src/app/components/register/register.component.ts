import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  message: string;
  returnUrl: string;
  error = '';
  signupData;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['']
    });

  }

  // A simple get method to get access to form controls
  get myForm() { return this.signUpForm.controls; }

  signup() {

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      this.message = 'Please check the details and retry.';
      return;
    } else {
      const user = this.authService.signup(this.signUpForm.value).subscribe(
        data => {
          if (data) {
            this.signupData = data;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', this.signupData);
            this.router.navigate(['/login']);
          } else {
            this.message = 'Please check the details and retry.';
          }
        },
        error => {
          this.message = 'User already exists.';
        }
      );
    }
  }

}
