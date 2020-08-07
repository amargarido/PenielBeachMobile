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

  totalLandings = null;
  pagesLandings: any;


  constructor(private http: HttpClient) { }



  // getPrivatePosts() {
  //   return this.http.get<any[]>(GlobalConstants.siteApiURL +'/wp/v2/posts?_embed&status=private').pipe(
  //     map(data => {
  //       for (let post of data) {
  //         if (post['_embedded']['wp:featuredmedia']) {
  //           post.media_url =
  //             post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
  //         }
  //       }
  //       return data;
  //     })
  //   );
  // }



  getLandingPages(page = 1): Observable<any[]> {

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
    return this.http.get<any[]>(GlobalConstants.siteApiURL + '/wp/v2/posts?_embed&status=private', options).pipe(
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
  }

  getComunidadeContent() { // 8:01

  }


  getIDPaginaMural(): Promise<any> {

    console.log('Entrei em getIDPaginaMural()');

    let paginaoptions = {
      observe: "response" as "body",
    };
    return this.http.get<number>(
      GlobalConstants.siteApiURL + '/wp/v2/pages?slug=mural', paginaoptions).toPromise();

  }


  oretorno: any;

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
    return this.http.get<any>(GlobalConstants.siteApiURL + '/wp/v2/pages/' + this.oretorno, options).toPromise().then(
      resp => {

        // console.log('getAPagina... resp:');
        // console.log(resp);

        let data = resp['body'];

        // console.log('getAPagina... data(body):');
        // console.log(data);

        // try {
        //   console.log('data[i9page_meta_fields]');
        //   console.log(data['i9page_meta_fields']);


        //   try {
        //     console.log('data[i9page_meta_fields][i9_app_escola_discipulo_url]');
        //     console.log(data['i9page_meta_fields']['i9_app_escola_discipulo_url']);
        //   } catch (error) {
        //     console.log(error);
        //   }


        // } catch (error) {
        //   console.log(error);
        // }

        return data;
      }
    );
  }






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

        // console.log('getAPagina... resp:');
        // console.log(resp);

        let data = resp['body'];

        // console.log('getAPagina... data(body):');
        // console.log(data);

        // try {
        //   console.log('data[i9page_meta_fields]');
        //   console.log(data['i9page_meta_fields']);


        //   try {
        //     console.log('data[i9page_meta_fields][i9_app_escola_discipulo_url]');
        //     console.log(data['i9page_meta_fields']['i9_app_escola_discipulo_url']);
        //   } catch (error) {
        //     console.log(error);
        //   }


        // } catch (error) {
        //   console.log(error);
        // }

        return data;
      }
    );
  }
}