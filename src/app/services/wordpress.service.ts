import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  totalComunidades = null;
  pagesComunidades: any;

  totalAtividades = null;
  pagesAtividades: any;

  totalMembros = null;
  pagesMembros: any;

  totalMensagens = null;
  pagesMensagens: any;

  totalLandings = null;
  pagesLandings: any;

  oretorno: any;

  constructor(
    private http: HttpClient
  ) { }


  TTTgetLandingPages(page = 1): Observable<any[]> {

    let options = {
      observe: "response" as "body",
      params: {
        per_page: '10',
        page: '' + page
      }
    };

    return this.http.get<any[]>(GlobalConstants.siteApiURL + '/buddypress/v1/activity?_embed&user_id=2', options).pipe(
      map(resp => {

        this.pagesLandings = resp['headers'].get('x-wp-totalpages');
        this.totalLandings = resp['headers'].get('x-wp-total');

        let data = resp['body'];

        for (let atividade of data) {

          // console.log('atividade:');
          // console.log(atividade);
          // trata imagem

          try {
            atividade.media_url = atividade['_embedded'];//['wp:featuredmedia'][0]['media_details'].sizes['thumbnail'].source_url;

            // console.log('Lendo _embedded:');
            // console.log(atividade.media_url);
          } catch (error) {
            console.log('wordpress.service|getAtividades.error:');
            console.log(error);
          }

        }
        return data;
      })
    );
  }



  getAtividades(page = 1): Observable<any[]> {

    let options = {
      observe: "response" as "body",
      params: {
        per_page: '10',
        page: '' + page
      }
    };

    return this.http.get<any[]>(GlobalConstants.siteApiURL + '/buddypress/v1/activity?_embed', options).pipe(
      map(resp => {

        this.pagesAtividades = resp['headers'].get('x-wp-totalpages');
        this.totalAtividades = resp['headers'].get('x-wp-total');

        let data = resp['body'];

        for (let atividade of data) {

          // console.log('atividade:');
          // console.log(atividade);
          // trata imagem

          try {
            atividade.media_url = atividade['_embedded'];//['wp:featuredmedia'][0]['media_details'].sizes['thumbnail'].source_url;

            // console.log('Lendo _embedded:');
            // console.log(atividade.media_url);
          } catch (error) {
            console.log('wordpress.service|getAtividades.error:');
            console.log(error);
          }

        }
        return data;
      })
    );
  }



  getComunidades(page = 1): Observable<any[]> {

    let options = {
      observe: "response" as "body",
      params: {
        per_page: '10',
        page: '' + page
      }
    };
    return this.http.get<any[]>(GlobalConstants.siteApiURL + '/wp/v2/posts?_embed', options).pipe(
      map(resp => {

        this.pagesComunidades = resp['headers'].get('x-wp-totalpages');
        this.totalComunidades = resp['headers'].get('x-wp-total');

        let data = resp['body'];

        for (let comunidade of data) {

          // console.log('comunidade:');
          // console.log(comunidade);
          // trata imagem

          try {
            comunidade.media_url = comunidade['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['thumbnail'].source_url;

            console.log(comunidade.media_url);
          } catch (error) {
            console.log('wordpress.service|getComunidades.error:');
            console.log(error);
          }

        }
        return data;
      })
    );
  } // getComunidades



  /*****
   * Mural
   * 
   */
  getIDPaginaMural(): Promise<any> {

    console.log('Entrei em getIDPaginaMural()');

    let paginaoptions = {
      observe: "response" as "body",
    };
    return this.http.get<number>(
      GlobalConstants.siteApiURL + '/wp/v2/pages?slug=mural', paginaoptions).toPromise();

  }


  async getPaginaMural(): Promise<any> {

    await this.getIDPaginaMural().then(retorno => {

      console.log('Valor de getIDPaginaMural():');
      console.log(retorno);

      this.oretorno = retorno['body'][0]['id'];

      console.log('Valor de getIDPaginaMural()' + this.oretorno);
    }
    );

    let options = {
      observe: "response" as "body",

    };
    return this.http.get<any>(GlobalConstants.siteApiURL + '/wp/v2/pages/' + this.oretorno, options).
      toPromise().then(
        resp => {

          let data = resp['body'];

          return data;
        }
      );
  }

  // Mural

  /**
   * Igreja
   * 
   */

  getIDIgreja(): Promise<any> {

    console.log('Entrei em getIDIgreja()');

    let paginaoptions = {
      observe: "response" as "body",
    };
    return this.http.get<number>(
      GlobalConstants.siteApiURL + '/buddyboss/v1/members?search=igreja peniel', paginaoptions).toPromise();

  }


  async getPaginaIgreja(): Promise<any> {

    await this.getIDIgreja().then(retorno => {

      console.log('Valor de getIDIgreja():');
      console.log(retorno);

      this.oretorno = retorno['body'][0]['id'];

      console.log('Valor de getIDIgreja()' + this.oretorno);
    }
    );

    let options = {
      observe: "response" as "body",

    };
    return this.http.get<any>(GlobalConstants.siteApiURL + '/buddyboss/v1/members/' + this.oretorno, options).
      toPromise().then(
        resp => {

          let data = resp['body'];

          return data;
        }
      );
  }
  // Igreja

  /**
   * Membros
   * 
   * 
   * Ver membros >  https://penielbeach.com.br/membros/ 
  https://www.buddyboss.com/resources/api/#api-Members-GetBBMembers 
  https://penielbeach.com.br/wp-json/buddyboss/v1/members?per_page=3&type=alphabetical
  
   */




  getMembros(page = 1): Observable<any[]> {

    let options = {
      observe: "response" as "body",
      params: {
        per_page: '5',
        type: 'alphabetical',
        page: '' + page
      }
    };
    return this.http.get<any[]>(GlobalConstants.siteApiURL + '/buddyboss/v1/members', options).pipe(
      map(resp => {

        this.pagesMembros = resp['headers'].get('x-wp-totalpages');
        this.totalMembros = resp['headers'].get('x-wp-total');

        let data = resp['body'];

        for (let membro of data) {

          console.log('membro:');
          console.log(membro);
          //  trata imagem

          try {
            membro.media_url = membro['avatar_urls']['thumb'];

            console.log(membro.media_url);
          } catch (error) {
            console.log('wordpress.service|getMembros.error:');
            console.log(error);
          }

        }
        return data;
      })
    );
  } // getMembros


/**
 * Notificações e Mensagens
 * 
 */



getMensagens(page = 1): Observable<any[]> {

  let options = {
    observe: "response" as "body",
    params: {
      page: '' + page
    }
  };
  return this.http.get<any[]>(GlobalConstants.siteApiURL + '/buddyboss/v1/messages', options).pipe(
    map(resp => {

      this.pagesMensagens = resp['headers'].get('x-wp-totalpages');
      this.totalMensagens = resp['headers'].get('x-wp-total');

      let data = resp['body'];

      for (let mensagen of data) {

        console.log('mensagen:');
        console.log(mensagen);
        //  trata imagem

        try {
          mensagen.media_url = mensagen['avatar'][0]['thumb'];

          console.log(mensagen.media_url);
        } catch (error) {
          console.log('wordpress.service|getMensagens.error:');
          console.log(error);
        }

      }
      return data;
    })
  );
} // getMensagens



  //////////////

  getIdPagina(): Promise<any> {

    console.log('Entrei em getIdPagina()');

    let paginaoptions = {
      observe: "response" as "body",
    };
    return this.http.get<number>(
      GlobalConstants.siteApiURL + '/wp/v2/pages?slug=escola-de-discipulo', paginaoptions).toPromise();

  }


  // oretorno: any;

  async getAPagina(): Promise<any> {

    await this.getIdPagina().then(retorno => {

      console.log('Valor de getIdPagina()  retorno');
      console.log(retorno);

      this.oretorno = retorno['body'][0]['id'];

      console.log('Valor de getIdPagina()' + this.oretorno);
    }
    );

    let options = {
      observe: "response" as "body",

    };
    return this.http.get<any>(GlobalConstants.siteApiURL + '/wp/v2/pages/' + this.oretorno, options).toPromise().then(
      resp => {

        let data = resp['body'];

        return data;
      }
    );
  }
}