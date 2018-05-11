import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GESAC_API } from '../app.api';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    constructor(
      private http: HttpClient,
      private router: Router
    ) { }

    login(login: string, senha: string) {
        return this.http.post<any>(`http://172.25.117.3:310/autentica`, { login: login, senha: senha })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user);
                }
                return user;
            });
    }

getToken() {
  return localStorage.getItem('currentUser');
}

logout() {
  localStorage.removeItem('currentUser');
  this.router.navigate(['login']);
}

isLogado() {
  if (localStorage.getItem('currentUser')) {
    return true;
  } else {
    return false;
  }
}

}
