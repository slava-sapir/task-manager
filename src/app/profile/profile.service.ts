import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { pipe, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
  signedin$ = new BehaviorSubject(null);
  rootUrl = 'https://sapir-task-manager.herokuapp.com';

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get<User>(`${this.rootUrl}/users/me`);
   }

  updateProfile(user: User) {
    const update = { age: user.age, name: user.name, email: user.email };
    return this.http.patch<User>(`${this.rootUrl}/users/me`, update);
  }

  updatePassword(password: string) {
    const update = { password };
    return this.http.patch<User>(`${this.rootUrl}/users/me/password`, update);
  }

  deleteProfile() {
    return this.http.delete(`${this.rootUrl}/users/me`);
  }
}
