import { Component, OnInit } from '@angular/core';

import { WordpressService } from '../../../services/wordpress.service';
import { AuthenticationService } from '../../../services/authentication.service';


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

    console.log("ionViewDidEnter()");

    
  }

  

async populaDados(osDados){

    console.log("populaDados() this mural...");
    console.log(osDados)

    this.dados = [];
    
    // mural.i9page_meta_fields._oembed_8c10d07cfebdf1d1063f72a7eb0be799[0]
      for (let element in osDados.i9page_meta_fields) {


        

        this.dados.push({
          'nome': element,
          'valor': osDados.i9page_meta_fields[element][0]
        });


        // this.mural['aaa'][element]= osDados.i9page_meta_fields[element][0];

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


