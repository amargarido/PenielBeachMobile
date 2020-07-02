import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController/*, Platform*/ } from '@ionic/angular';
import { GlobalConstants } from '../common/global-constants';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../authinterface/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  favorites: string[] = [];
  HAS_LOGGED_IN:string = 'hasLoggedIn';
  JWT_KEY:string = 'hasLoggedToken';
  HAS_SEEN_TUTORIAL:string = 'hasSeenTutorial';

  constructor(
//    private router: Router,
    private storage: Storage,
//    private platform: Platform,
    private http: HttpClient,
    public toastController: ToastController
  ) { }

  
  async registerLogin(logData: AuthResponse): Promise<any> {



    console.log('REGISTERlOGIN');
    console.log(logData.token);
    console.log(logData.user_email);
    

    await this.storage.set(this.HAS_LOGGED_IN, true);
    await this.storage.set(this.JWT_KEY, logData.token);
    //OK this.setUsername(username);
    return window.dispatchEvent(new CustomEvent('user:login'));
  }

/////////////////////////////






  doLogin(/*username: string, password: string*/) {

    console.log('doLogin.CALL');

    return this.http.post<any>(GlobalConstants.siteApiURL + '/jwt-auth/v1/token', 
      {
        username: 'betomano',
        password: 'M@noB3t02021'
      } )
        .pipe(map(user => {
  
          console.log('doLogin.user:');
          console.log(user);
          
          return user;
        }

      )
    );
  }
  

  async logout(): Promise<any> {
    await this.storage.remove(this.HAS_LOGGED_IN);
    await this.storage.remove('username');
    window.dispatchEvent(new CustomEvent('user:logout'));
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