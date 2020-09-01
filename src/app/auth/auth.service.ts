import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  name: string;
  password: string;
}

interface SignupResponse {
  user: { name: '' };
  token: string;
}

interface SignedinResponse {
  authenticated: boolean;
  name: string;
}

interface SigninCredentials {
  email: string;
  password: string;
}

interface SigninResponse {
  user: { name: '' };
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://sapir-task-manager.herokuapp.com';

  signedin$ = new BehaviorSubject(null);
  constructor( private http: HttpClient) { }
  
  // todo this function which check if its username exist in database 
  usernameAvailable(name: string) {
   return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/unique`, { name });
  }

  signup(credentials: SignupCredentials) {
   return this.http.post<SignupResponse>(`${this.rootUrl}/users`, credentials)
   .pipe(
     tap( () => {
        this.signedin$.next(true);
     })
   );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/users/signedin`)
    .pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signout() {
    return this.http.post(`${this.rootUrl}/users/logout`, {})
    .pipe(
      tap ( () => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
       return this.http.post<SigninResponse>(`${this.rootUrl}/users/login`, credentials)
       .pipe(
         tap( () => {
           this.signedin$.next(true);
         })
     );
  }

}
