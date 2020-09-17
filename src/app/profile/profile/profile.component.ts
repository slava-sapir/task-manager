import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './../profile.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UniqueUsername } from 'src/app/auth/validators/unique-username';
import { MatchPassword } from 'src/app/auth/validators/match-password';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent  implements OnInit{
  signedin$: BehaviorSubject<boolean>;
  EditPersonalInfo = 'Edit your personal information';
  EditPassword = 'Change your password';
  DeleteProfile = 'Delete your profile';
  userForm: FormGroup;
  user: User;
  openItemIndex1: boolean = false;
  openItemIndex2: boolean = false;
  openItemIndex3: boolean = false;
  showSuccess: boolean = false;
  showMessage: boolean = false;
  userProfile = { age: '', name: '', email: '', createdAt: '', updatedAt: '' };

  constructor(private profileService: ProfileService,
              private uniqueUsername: UniqueUsername,
              private matchPassword: MatchPassword,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) { 
                this.route.data.subscribe( ({ user }) => {
                  this.user = user;
                  });
              }

   ngOnInit (): void {
    if (this.user) {
      this.userProfile  = this.user;
      this.userForm = new FormGroup ({
      age: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(1[89]|[2-9]\d)$/)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ], [this.uniqueUsername.validate]),
      email: new FormControl('', [
        Validators.required, 
        Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
      ]),
      createdAt: new FormControl(this.userProfile.createdAt),
      updatedAt: new FormControl(this.userProfile.updatedAt),
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
  
    }
  }



  openForm() {
    this.openItemIndex1 = !this.openItemIndex1;
 }

  openPassForm() {
  this.openItemIndex2 = !this.openItemIndex2;
}

  openDeleteForm() {
  this.openItemIndex3 = !this.openItemIndex3;
}

  cancel() {
  // this.openItemIndex = false;
   this.userForm.reset();
 }

  closeShowMessage() {
   this.showSuccess = false;
 }

  update(user: User) {
    console.log(user)
    this.profileService.updateProfile(user).subscribe( {
      next: profile => {
      localStorage.setItem('username', profile.name);
      this.userProfile = profile;
      this.userForm.reset();
      this.showSuccess = true;
    },
    error: err => {
      if (!err.status) {
        this.userForm.setErrors({ noConnection: true });
      } else {
        this.userForm.setErrors({ unknownError: true });
      }
    }
 });
}

  updatePassword(password: string) {
    this.userForm.reset();
    this.profileService.updatePassword(password).subscribe( () => {
    this.showSuccess = true;
  });
}

  //  delete() {
  //   this.profileService.deleteProfile().subscribe( () => { 
  //     if(localStorage.getItem('token')) {
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('username');
  //       this.authService.signedin$.next(false); 
  //       this.router.navigateByUrl('/');
  //       } else { 
  //         this.authService.signedin$.next(false); 
  //         this.router.navigateByUrl('/');}
  //   });
  // }

}
