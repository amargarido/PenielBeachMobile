import { Component, OnInit } from '@angular/core';

import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-comunidade',
  templateUrl: './comunidade.page.html',
  styleUrls: ['./comunidade.page.scss'],
})
export class ComunidadePage implements OnInit {

  // posts: Observable<any[]>;
  posts = [];
  page = 1;
  count = null;

  constructor(
    private authService: AuthenticationService,
    private wp: WordpressService
    )
  { }

  async ngOnInit() {

    this.wp.getPosts().subscribe(res =>{
      this.count = this.wp.totalPosts;
      this.posts = res;

    })
  }

  async loadMore(event){

    this.page++;

    this.wp.getPosts(this.page).subscribe(res =>{
      
      this.posts = [...this.posts, ...res];

      event.target.complete();
      // loading.dismiss();

      if( this.page == this.wp.pages ){

        event.target.disabled = true;

      }

    })

  }

  logoutUser(){
    this.authService.logout();
  }

}