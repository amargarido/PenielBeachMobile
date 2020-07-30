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

    { name: 'Igreja',             slug: 'business'},
    { name: 'Menu',               slug: 'speedometer'},
    { name: 'Célula',             slug: 'people'},
    { name: 'Perfil',             slug: 'person'},
    { name: 'Configuração',       slug: 'settings'},
    { name: 'Reserva',            slug: 'pricetags'},

    { name: 'Mensagem recebida',  slug: 'mail'},
    { name: 'Mensagem aberta',    slug: 'mail-open'},  
    { name: 'Enviando mensagem',  slug: 'mail-unread'},

    { name: 'Embaixada',          slug: 'school'},
    { name: 'Aconselhamento',     slug: 'chatbubbles'},
    { name: 'Business beach',     slug: 'pricetags'},
    
    { name: 'Peniel TV',          slug: 'tablet-portrait'},
    { name: 'Pesquisa',           slug: 'search-circle'}, 
    { name: 'Notícias',           slug: 'newspaper'},

    { name: 'Instagram',          slug: 'logo-instagram'},
    { name: 'Twitter',            slug: 'logo-twitter'},
    { name: 'Facebook',           slug: 'logo-facebook'},
    { name: 'WhatsApp',           slug: 'logo-whatsapp'},
    { name: 'Youtube',            slug: 'logo-youtube'}
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

