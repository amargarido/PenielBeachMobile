import { Component, OnInit } from '@angular/core';

import { WordpressService} from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';

import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.page.html',
  styleUrls: ['./land-page.page.scss'],
})
export class LandPagePage implements OnInit {


  
  categories = [

    { name: 'Um',       slug: 'business'},
    { name: 'Dois',     slug: 'cloud'},
    { name: 'Tres',     slug: 'calendar'},
    { name: 'Quatro',   slug: 'flame'},
    { name: 'Cinco',    slug: 'bonfire'},
    { name: 'Seis',     slug: 'eye-off'},
    { name: 'Sete',     slug: 'fitness'},
    { name: 'Oito',     slug: 'heart-circle'},
    { name: 'Nove',     slug: 'location'},
    { name: 'Dez',      slug: 'mail'},
    { name: 'Onze',     slug: 'mail-open'},  
    { name: 'Doze',     slug: 'mail-unread'},
    { name: 'Treze',    slug: 'navigate'},
    { name: 'Quatorze', slug: 'person'}, 
    { name: 'Quinze',   slug: 'newspaper'},
    { name: 'Dezesseis', slug: 'receipt'},
    { name: "Célula",   slug:"person-circle"}

];





  page = 1;
  count = null;

  showSearchbar: boolean = false;

  user = this.authService.getCurrentUser();
  

  constructor(
    private wp: WordpressService,
    private authService: AuthenticationService,
    private platform: Platform
  )
  { 



    // if (this.platform.is('hybrid')) {

    //   console.log('Platform: hybrid');
    // } else if (this.platform.is('android')) {
    //   console.log('Platform: android');
    // } else if (this.platform.is('capacitor')) {
    //   console.log('Platform: capacitor');
    // } else if (this.platform.is('pwa')) {
    //   console.log('Platform: pwa');
    // } else {
    //   console.log('Platform?:'+ this.platform.platforms());
    // }



    this.user.subscribe(user => {
      if (user) {
        } else {
      }
    });
  }

  ngOnInit() {

  }

  ionViewDidLoad(){}



  

}

