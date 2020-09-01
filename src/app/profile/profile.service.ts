import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})

export class ProfileService {

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
}
