import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {

  count: number;
  mensagens: any[];

  constructor(
    private wp: WordpressService
  )
  { }


  async ngOnInit() {

    this.wp.getMensagens().subscribe(res =>{
      this.count = this.wp.totalMensagens;
      this.mensagens = res;

    })
  }



}
