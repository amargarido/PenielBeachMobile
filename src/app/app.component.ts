import { Component } from '@angular/core';

import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Storage } from '@ionic/storage';
//import { SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  dark: boolean = false;
  loggedIn: boolean = false;

  muralPages = [
    {
      title: 'Pedido Oração',
      url: '/app/tabs/pedidosoracao',
      icon: 'person-circle'
    },
    {
      title: 'Comunidade',
      url: '/app/tabs/comunidade',
      icon: 'people-circle'
    },
    {
      title: 'Atividades',
      url: '/app/tabs/atividades',
      icon: 'calendar'
    }

  ];


  cultoAoVivoPages = [
    {
      title: 'Culto ao Vivo',
      url: 'culto-ao-vivo',
      icon: 'play-circle'
    }

  ];


  escolaDiscipulosPages = [
    {
      title: 'Escola de Discípulos',
      url: 'escola-de-discipulos',
      icon: 'school'
    }

  ];



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private router: Router,
    private authService: AuthenticationService,
    private menu: MenuController,
    private storage: Storage,
    private toastCtrl: ToastController,
  ) {
     this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    // this.swUpdate.available.subscribe(async res => {
    //   const toast = await this.toastCtrl.create({
    //     message: 'Update available!',
    //     position: 'bottom',
    //     buttons: [
    //       {
    //         role: 'cancel',
    //         text: 'Reload'
    //       }
    //     ]
    //   });

    //   await toast.present();

    //   toast
    //     .onDidDismiss()
    //     .then(() => this.swUpdate.activateUpdate())
    //     .then(() => window.location.reload());
    // });
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.authService.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      
      this.loggedIn = loggedIn;
      console.log('updateLoggedInStatus: ' + this.loggedIn);

      if(this.loggedIn){
        this.router.navigate(['/app'])

      } else {
        this.router.navigate(['login'])

      }



    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      return this.router.navigate(['login']);
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

}

/*

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/schedule');
    });
  }

  

  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      
      this.authenticationService.authState.subscribe(state => {

        console.log('Authenticate state:');
        console.log(state);

        if (state) {
          this.router.navigate(['/app', 'tabs']);
        } else {
          this.router.navigate(['login']);
        }

      });
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigate(['tutorial']);
  }
}
*/