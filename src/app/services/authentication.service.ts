import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { GlobalConstants } from '../common/global-constants';

import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { AuthResponse } from '../authinterface/auth-response';

const JWT_KEY:string = 'hasLoggedToken';

@Injectable({
  providedIn: 'root'
})        /* ApiService sample */
export class AuthenticationService {

  favorites: string[] = [];
  HAS_LOGGED_IN:string = 'hasLoggedIn';
  
  HAS_SEEN_TUTORIAL:string = 'hasSeenTutorial';

  private user = new BehaviorSubject(null);

  constructor(
    private http: HttpClient, 
    private storage: Storage, 
    private plt: Platform
    ){
    this.plt.ready().then(() => {
      this.storage.get(JWT_KEY).then(data => {
        if (data) {
          this.user.next(data);
        }
      })
    })
  }


  
  async registerLogin(logData: AuthResponse): Promise<any> {

    console.log('registerLogin');
    console.log(logData.token);
    console.log(logData.user_email);

    await this.storage.set(this.HAS_LOGGED_IN, true);
    await this.storage.set(JWT_KEY, logData.token);
    //OK this.setUsername(username);
    return window.dispatchEvent(new CustomEvent('user:login'));
  }

  doLogin(username: string, password: string) {

    console.log('doLogin.CALL');

    return this.http.post<any>(GlobalConstants.siteApiURL + '/jwt-auth/v1/token', 
      { username, 
        password 
      }
     ).pipe(

        switchMap(data => {
          return from(
            this.storage.set(JWT_KEY, data)
            );
        }),
        tap(data => {
          this.user.next(data);
        })

        /*
        .pipe(map(user => {
  
          console.log('doLogin.user:');
          console.log(user);
          
          return user;
        }

      )
      */
    );
  }
  
  // TODO signUp(username, email, password)
  // TODO resetPassword(usernameOrEmail)

  getCurrentUser() {
    return this.user.asObservable();
  }
 
  getUserValue() {
    return this.user.getValue();
  }


  async logout(): Promise<any> {
  
  
    await this.storage.remove(this.HAS_LOGGED_IN);
    await this.storage.remove('username');
    window.dispatchEvent(new CustomEvent('user:logout'));

    this.storage.remove(JWT_KEY).then(() => {
      this.user.next(null);
    });
  }

  async signup(username: string): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    return window.dispatchEvent(new CustomEvent('user:signup'));
  }



  
  


  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  async getUsername(): Promise<string> {
    const value = await this.storage.get('username');
    return value;
  }

  async isLoggedIn(): Promise<boolean> {
    const value = await this.storage.get(this.HAS_LOGGED_IN);
    return value === true;
  }
/*
  async checkHasSeenTutorial(): Promise<string> {
    const value = await this.storage.get(this.HAS_SEEN_TUTORIAL);
    return value;
  }
*/

}