import { Component, OnInit } from '@angular/core';

import { WordpressService } from '../../services/wordpress.service';


@Component({
  selector: 'app-comunidade',
  templateUrl: './comunidade.page.html',
  styleUrls: ['./comunidade.page.scss'],
})
export class ComunidadePage implements OnInit {

  comunidades = [];
  page = 1;
  count = null;

  constructor(
    private wp: WordpressService
  )
  { }

  async ngOnInit() {

    this.wp.getComunidades().subscribe(res =>{
      this.count = this.wp.totalComunidades;
      this.comunidades = res;

    })
  }

  async loadMore(event){

    this.page++;

    this.wp.getComunidades(this.page).subscribe(res =>{
      
      this.comunidades = [...this.comunidades, ...res];

      event.target.complete();
  
      if( this.page == this.wp.pagesComunidades ){

        event.target.disabled = true;
      }

    })
  }

}