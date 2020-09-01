import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


interface ProfileResponse {
  _id: string;
  name: string;
  avatar: any;
}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  rootUrl = 'https://sapir-task-manager.herokuapp.com';

  constructor(private http: HttpClient) { }

  private _refreshPage$ = new Subject<void>();

  get refreshPage() {
    return this._refreshPage$;
  }

  upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('avatar', file);
    return this.http.post<any>(`${this.rootUrl}/users/me/avatar`, formData)
    .pipe(
      tap( () => this._refreshPage$.next())
     );
  }

  getProfile() {
   return this.http.get<ProfileResponse>(`${this.rootUrl}/users/me`);
  }

  delete() {
    return this.http.delete(`${this.rootUrl}/users/me/avatar`)
    .pipe(
      tap( () => this._refreshPage$.next())
     );
  }

}
