import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.page.html',
  styleUrls: ['./membros.page.scss'],
})
export class MembrosPage implements OnInit {


  membros = [];
  page = 1;
  count = null;

  constructor(
    private wp: WordpressService
  )
  { }

  async ngOnInit() {

    this.wp.getMembros().subscribe(res =>{
      this.count = this.wp.totalMembros;
      this.membros = res;

    })
  }

  async loadMore(event){

    this.page++;

    this.wp.getMembros(this.page).subscribe(res =>{
      
      this.membros = [...this.membros, ...res];

      event.target.complete();
  
      if( this.page == this.wp.pagesMembros ){

        event.target.disabled = true;
      }

    })
  }

}