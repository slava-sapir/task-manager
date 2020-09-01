import { ProfileService } from './profile.service';
import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './user';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<User> {

  constructor(private profileService: ProfileService,
              private router: Router) { }

  resolve() {
    return this.profileService.getProfile()
    .pipe(
      catchError( () => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
}
