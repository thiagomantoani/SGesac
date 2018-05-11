﻿import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    public authenticationService: AuthenticationService
  ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = this.authenticationService.getToken();

        if (currentUser) {
        request = request.clone({
            setHeaders: {
            'x-access-token': currentUser
          }
        });
      }
        return next.handle(request)
        .do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {

            }
            }, (err: any) => {
               if (err instanceof HttpErrorResponse) {
                if (err.status === 401 || err.status === 403) {
                  this.authenticationService.logout();
                }
               }
             });
    }
}
