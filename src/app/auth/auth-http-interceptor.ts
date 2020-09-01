import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { filter, tap } from 'rxjs/operators';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
     const authToken = this.authService.getToken();
     if (authToken) {
      const authReq = req.clone({
      headers: req.headers.set( 'Authorization', 'Bearer ' + authToken)
       });
      return next.handle(authReq);
      // in case we need indication about response type
      // .pipe(
      //   filter(value => value.type === HttpEventType.Response),
      //   tap( val => {
      //     console.log(val);
      //   })
      // );
    } 
     return next.handle(req);
   }

}
