import { Component, OnInit } from '@angular/core';

import { WordpressService} from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';

import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.page.html',
  styleUrls: ['./land-page.page.scss'],
})
export class LandPagePage implements OnInit {

  datalandings = [];
  page = 1;
  count = null;

  showSearchbar: boolean = false;

  user = this.authService.getCurrentUser();
  

  constructor(
    private wp: WordpressService,
    private authService: AuthenticationService,
    private platform: Platform
  )
  { 



    // if (this.platform.is('hybrid')) {

    //   console.log('Platform: hybrid');
    // } else if (this.platform.is('android')) {
    //   console.log('Platform: android');
    // } else if (this.platform.is('capacitor')) {
    //   console.log('Platform: capacitor');
    // } else if (this.platform.is('pwa')) {
    //   console.log('Platform: pwa');
    // } else {
    //   console.log('Platform?:'+ this.platform.platforms());
    // }



    this.user.subscribe(user => {
      if (user) {
        this.loadLandingPagePosts();
      } else {
        this.datalandings = [];
      }
    });
  }

  ngOnInit() {

  }

  loadLandingPagePosts() {

    this.wp.getLandingPages().subscribe(response =>{
      this.count = this.wp.totalLandings;
      this.datalandings = response;

    })

  }

  async loadMore(event){

    this.page++;

    this.wp.getLandingPages(this.page).subscribe(res =>{
      
      this.datalandings = [...this.datalandings, ...res];

      event.target.complete();
  
      if( this.page == this.wp.pagesLandings ){

        event.target.disabled = true;
      }

    })
  }

}

