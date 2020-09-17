import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  myFooter = 'created by slava sapir | © 2020 Copyright: All right reserved | slavas21@gmail.com';
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
  this.signedin$ = this.authService.signedin$;
  }

  ngOnInit() {
  this.authService.checkAuth().subscribe( () => {});
  }

}
