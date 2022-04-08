import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
      return;
    }
    let user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (
        user.email === this.f.email.value &&
        user.password === this.f.password.value
      ) {
        this.router.navigate(['/notes'])
      } else {
        alert('Enter the correct credentials');
      }
    }
    else {
      alert('Please register first');
    }

    setTimeout(() => {
      this.loading=false
    }, 500);

  }
}
