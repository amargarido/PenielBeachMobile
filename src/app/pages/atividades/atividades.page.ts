import { Component, OnInit } from '@angular/core';

import { WordpressService} from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.page.html',
  styleUrls: ['./atividades.page.scss'],
})
export class AtividadesPage implements OnInit {

  atividades = [];
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



    if (this.platform.is('hybrid')) {

      console.log('Platform: hybrid');
    } else if (this.platform.is('android')) {
      console.log('Platform: android');
    } else if (this.platform.is('capacitor')) {
      console.log('Platform: capacitor');
    } else if (this.platform.is('pwa')) {
      console.log('Platform: pwa');
    } else {
      console.log('Platform?:'+ this.platform.platforms());
    }



    this.user.subscribe(user => {
      if (user) {
        this.loadAtividadesPosts();
      } else {
        this.atividades = [];
      }
    });
  }

  ngOnInit() {

  }

  loadAtividadesPosts() {

    this.wp.getAtividades().subscribe(response =>{
      this.count = this.wp.totalAtividades;
      this.atividades = response;

    })

  }

  async loadMore(event){

    this.page++;

    this.wp.getAtividades(this.page).subscribe(res =>{
      
      this.atividades = [...this.atividades, ...res];

      event.target.complete();
  
      if( this.page == this.wp.pagesAtividades ){

        event.target.disabled = true;
      }

    })
  }

}

