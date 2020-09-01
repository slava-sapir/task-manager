import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.signout().subscribe( () => {
      if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigateByUrl('/');
      } else { this.router.navigateByUrl('/');}
    });
  }

}
