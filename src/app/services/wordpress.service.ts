import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants} from '../common/global-constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

totalPosts = null;
pages: any;

  constructor(private http: HttpClient) { }

  
  getPosts(page = 1)/*: Observable<any[]>*/ {

    let options = {
      observe: "response" as "body",
      params: {
        per_page: '1',
        page: ''+page
    }
  
  };

    return this.http.get<any[]>( GlobalConstants.siteApiURL + '/wp/v2/posts?_embed', options ).pipe(
      map(resp=>{

          this.pages      = resp['headers'].get('x-wp-totalpages');
          this.totalPosts = resp['headers'].get('x-wp-total');

          let data = resp['body'];

          for(let post of data){

            //console.log('post:' +post);
              // trata imagem
              post.media_url = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['thumbnail'].source_url;
              console.log(post.media_url);
          }
          return data;
      })
    );
  }

  getPostContent(){ // 8:01

  }

  // getPosts(): Observable<any[]> {
  //   return this.http.get<any[]>(GlobalConstants.siteApiURL + '/wp/v2/posts?_embed').subscribe(data=>{
  //     //process the json data
  //     console.log(data)
  //     });
  //   }

}