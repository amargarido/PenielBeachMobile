import { Component, OnInit } from '@angular/core';

import { WordpressService} from '../../../services/wordpress.service';
import { AuthenticationService } from '../../../services/authentication.service';

import { Platform } from '@ionic/angular';

import { Router } from '@angular/router';


@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.page.html',
  styleUrls: ['./land-page.page.scss'],
})
export class LandPagePage implements OnInit {

  
  categories = [

    { name: 'Youtube',            slug: 'logo-youtube', navega:'videos'},
    { name: 'Mural',              slug: 'business',     navega:'mural'},
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
    
];


  page = 1;
  count = null;

  showSearchbar: boolean = false;

  user = this.authService.getCurrentUser();
  

  constructor(
    private wp          : WordpressService,
    private authService : AuthenticationService,
    private platform    : Platform,
    private router      : Router
  )
  { 

    this.user.subscribe(user => {
      if (user) {
        } else {
      }
    });
  }

  ngOnInit() {}

  ionViewDidLoad(){}

  goNavegacao(navega: String, name:String, slug: String){

    console.log('navega:');
    console.log(navega);

    this.router.navigate([navega]);

  }

}

