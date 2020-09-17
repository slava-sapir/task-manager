import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from './../profile.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.css']
})
export class ProfileDeleteComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;
  @Input() user: User;
  showModal = false;
  username: string;
  imgSrc = 'https://cdn.pixabay.com/photo/2013/07/12/13/21/delete-146891__340.png';

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  cancel() {
  this.showModal = false;
  }

  delete() {
    this.profileService.deleteProfile().subscribe( () => { 
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.authService.signedin$.next(false); 
        this.router.navigateByUrl('/');
        } else { 
          this.authService.signedin$.next(false); 
          this.router.navigateByUrl('/');}
    });
  }
}
