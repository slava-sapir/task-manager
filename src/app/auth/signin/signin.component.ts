import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 
  authForm = new FormGroup({
    email: new FormControl('',  [
      Validators.required,
      Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  });
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.authForm.invalid) {
      return; 
    }
    this.authService.signin(this.authForm.value).subscribe( {
      next: response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.user.name);
        this.router.navigateByUrl('/inbox');
      },
      error: ( {error} ) => {
        if (error) {
          this.authForm.setErrors({ credentials: true});
        }
      }
    });
  }
}
