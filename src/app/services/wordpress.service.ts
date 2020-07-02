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

  constructor(private http: HttpClient) { }

  getAtividades(page = 1): Observable<any[]> {

    let options = {
      observe: "response" as "body",
      params: {
        per_page: '2',
        page: '' + page
      }
    };

    return this.http.get<any[]>(GlobalConstants.siteApiURL + '/buddypress/v1/activity?_embed', options).pipe(
      map(resp => {

        this.pagesAtividades  = resp['headers'].get('x-wp-totalpages');
        this.totalAtividades = resp['headers'].get('x-wp-total');

        let data = resp['body'];

        for (let atividade of data) {

          console.log('atividade:');
          console.log(atividade);
          // trata imagem

          try {
            atividade.media_url = atividade['_embedded'];//['wp:featuredmedia'][0]['media_details'].sizes['thumbnail'].source_url;
            
            console.log('Lendo _embedded:');

            console.log(atividade.media_url);
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
        per_page: '2',
        page: '' + page
      }
    };

    return this.http.get<any[]>(GlobalConstants.siteApiURL + '/wp/v2/posts?_embed', options).pipe(
      map(resp => {

        this.pagesComunidades = resp['headers'].get('x-wp-totalpages');
        this.totalComunidades = resp['headers'].get('x-wp-total');

        let data = resp['body'];

        for (let comunidade of data) {

          console.log('comunidade:');
          console.log(comunidade);
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




}