import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  user: User = new User();
  emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  phoneRegex = RegExp(/^[0-9]\d*$/);
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern(this.emailRegex)],
      cellPhone: [
        '',
        Validators.required,
        Validators.minLength(11),
        Validators.minLength(13),

      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    debugger
    this.submitted = true;
    this.loading = true;
    if (this.form.invalid) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
      return;
    }
    localStorage.clear();
    this.user.firstName = this.f.firstName.value;
    this.user.lastName = this.f.lastName.value;
    this.user.dob = this.f.dob.value;
    this.user.email = this.f.email.value;
    this.user.cellPhone = this.f.cellPhone.value;
    this.user.password = this.f.password.value;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.router.navigate(['/notes'])
  }
}
