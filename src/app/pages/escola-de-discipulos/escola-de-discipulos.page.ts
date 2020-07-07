import { Component, OnInit } from '@angular/core';

import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-escola-de-discipulos',
  templateUrl: './escola-de-discipulos.page.html',
  styleUrls: ['./escola-de-discipulos.page.scss'],
})
export class EscolaDeDiscipulosPage implements OnInit {

  discipulo: any = null;
  page = 1;
  count = null;

  idPagina: number;

  showSearchbar: boolean = false;
  user = this.authService.getCurrentUser();


  constructor(
    private wp: WordpressService,
    private authService: AuthenticationService
  ) {

    console.log('Chamado....getAPagina() ');
    this.wp.getAPagina().then(response => {
      this.count = this.wp.totalAtividades;
      this.discipulo = response;

      console.log('this.discipulo :');
      console.log(this.discipulo);

    });
  }

  ngOnInit() {
  }

}

