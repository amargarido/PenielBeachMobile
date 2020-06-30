import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  authSerIsLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) { }


  async login(username: string): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    return window.dispatchEvent(new CustomEvent('user:login'));
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
    this.authSerIsLoggedIn = value;
    return value === true;
  }

  async checkHasSeenTutorial(): Promise<string> {
    const value = await this.storage.get(this.HAS_SEEN_TUTORIAL);
    return value;
  }

}