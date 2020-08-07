import { Component, OnInit } from '@angular/core';

import { WordpressService} from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';

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
    private authService: AuthenticationService
  )
  { 
    this.user.subscribe(user => {
      if (user) {
        this.loadAtividadesPosts();
      } else {
        this.atividades = [];
      }
    });
  }

  ngOnInit() {}

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

