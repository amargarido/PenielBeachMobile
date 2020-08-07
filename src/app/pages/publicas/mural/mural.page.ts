import { Component, OnInit } from '@angular/core';

import { WordpressService } from '../../../services/wordpress.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { environment } from 'src/environments/environment';
;

@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
})
export class MuralPage implements OnInit {

  public mural: any = null;
  public dados: { nome: string; valor: any; }[];

  count = null;
  idPaginaMural: number;
  user = this.authService.getCurrentUser();

  constructor(
    private wp: WordpressService,
    private authService: AuthenticationService,

  ) {

    this.carregaMural();
  }

  ngOnInit() {
  }



  ionViewDidLoad() {

    console.log("ionViewDidLoad()");
  }

  ionViewDidEnter() {

    if (!environment.production) {
      console.log("ionViewDidEnter()");
    }
  }


  async populaDados(osDados) {

    if (!environment.production) {

      console.log("populaDados() this mural...");
      console.log(osDados)
    }

    let re = /<iframe/gi; // RegEx


    this.dados = []; //  fundamental inicializar assim aqui !

    for (let element in osDados.i9page_meta_fields) {


      let aString: String = osDados.i9page_meta_fields[element][0];

      if (aString.search(re) == -1) {
        continue;
      } else {

        this.dados.push({
          'nome': element,
          'valor': osDados.i9page_meta_fields[element][0]
        });

      }


    }


    console.log("NOVO dados:");

    console.log(this.dados);

  }


  carregaMural() {

    console.log('Chamado....getPaginaMural() ');

    this.wp.getPaginaMural().then(response => {

      this.count = this.wp.totalAtividades;
      this.mural = response;

      console.log('this.mural :');
      console.log(this.mural);

      // setTimeout(() => this.populaDados(), 2000);

      this.populaDados(this.mural);

    });

  }

}


