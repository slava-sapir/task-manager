import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UniqueUsername } from './../validators/unique-username';
import { MatchPassword } from './../validators/match-password';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  token = '';
  name = '';

  authForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
      ], [this.uniqueUsername.validate]),
    email: new FormControl('',  [
      Validators.required,
      Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(1[89]|[2-9]\d)$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  }, { validators: [this.matchPassword.validate] });

  constructor(private matchPassword: MatchPassword,
              private uniqueUsername: UniqueUsername,
              private authService: AuthService,
              private router: Router ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value).subscribe( {
      next: response => { 
         localStorage.setItem('token', response.token);
         localStorage.setItem('username', response.user.name);
         this.token = response.token;
         this.name = response.user.name;
         console.log(`${this.name}  ${this.token}`);
         this.router.navigateByUrl('/inbox');
      },
      error: err => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }

}
