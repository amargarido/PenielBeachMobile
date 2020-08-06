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
  public anexos: any[] = null;

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

  dados: { nome: string; valor: any; }[];

  buttonClick(){

    console.log("buttonClick()...");

    console.log("this mural ...");
    console.log(this.mural)

    
      for (let element in this.mural.i9page_meta_fields) {


        
        this.dados.push({
          'nome': element,
          'valor': this.mural.i9page_meta_fields[element][0]
        });


        this.mural['aaa'][element]= this.mural.i9page_meta_fields[element][0];

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

      setTimeout(() => this.buttonClick(), 2000);


    });

  }

}


