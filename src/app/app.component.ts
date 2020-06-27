import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  dark: boolean = true;

  appPages = [
    {
      title: 'Atividades',
      url: '/app/tabs/atividades',
      icon: 'calendar'
    },
    {
      title: 'Pedido Oração',
      url: '/app/tabs/pedidosoracao',
      icon: 'people'
    },
    {
      title: 'Comunidade',
      url: '/app/tabs/comuniade',
      icon: 'map'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private router: Router,
    private authenticationService: AuthenticationService

  ) {
    this.initializeApp();
  }

  

  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      
      this.authenticationService.authState.subscribe(state => {

        console.log(state);
/*
        if (state) {
          // this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['login']);
        }
*/        
      });
    

    });

    
  }
}