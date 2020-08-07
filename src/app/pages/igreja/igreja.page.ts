import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-igreja',
  templateUrl: './igreja.page.html',
  styleUrls: ['./igreja.page.scss'],
})
export class IgrejaPage implements OnInit {

  igreja: any[];

  constructor(
    private wp: WordpressService
  ) {}

  ngOnInit() {
  }



  ionViewDidLoad() {

    console.log("ionViewDidLoad()");
  }

  ionViewDidEnter() {

    if (!environment.production) {
      console.log("ionViewDidEnter()");
    }

    this.carregaIgrejaPerfil();
  }




  carregaIgrejaPerfil() {

    console.log('Chamado....carregaIgrejaPerfil() ');

    this.wp.getPaginaIgreja().then(response => {


      this.igreja = response;

      console.log('igreja dados :');
      console.log(this.igreja);

      // setTimeout(() => this.populaDados(), 2000);

      // this.populaDados(this.mural);

    });

  }

  /*
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
  */

}
