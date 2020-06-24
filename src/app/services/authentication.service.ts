import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';

import { Observable, BehaviorSubject } from  'rxjs';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { User } from  '../authinterface/user';
import { AuthResponse } from  '../authinterface/auth-response';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
// authSubject  =  new  BehaviorSubject(false);

  AUTH_SERVER_ADDRESS:  string  =  'http://penielbeach.com.br';
  

  constructor(
    private  httpClient:  HttpClient,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login() {
    var dummy_response = {
      user_id: '007',
      user_name: 'test'
    };
    this.storage.set('USER_INFO', dummy_response).then((response) => {
      this.router.navigate(['dashboard']);
      this.authState.next(true);
    });
  }

/*
  login(user: User): Observable<AuthResponse> { // login -=> endpoint
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authState.next(true);
        }
      })
    );
  }
*/

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }


  /*
  register(user: User): Observable<AuthResponse> {
    //
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authState.next(true);
        }
      })

    );
  }
*/

}