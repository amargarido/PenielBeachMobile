import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { WordpressService } from '../services/wordpress.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';

/*
<ion-content> 
  <ion-grid class="ion-no-padding">
    <ion-row>
      <ion-col size-sm="4" size="12" *ngFor="let post of posts">
        <ion-card>
          <ion-card-header class="ion-no-padding">
            <img [src]="post.media_url">
          </ion-card-header>
          <ion-card-content>
            <ion-text color="dark">
              <h2 [innerHTML]="post.title.rendered"></h2>
            </ion-text>
            <!--ion-button color="primary" size="small" fill="outline" class="ion-float-right" (click)="edit(post)">
              <ion-icon name="create-outline" slot="start"></ion-icon> Edit
            </ion-button-->
            
            <ion-text>Data : {{ post.date_gmt |date: 'dd MMM yyy' }}</ion-text>
            <div [innerHTML]="post.excerpt.rendered"></div>
            <a class="ion-float-right" [routerLink]="['/', 'posts', post.id]">Leia Mais</a>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>

*/



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // posts: Observable<any[]>;
  posts = [];
  page = 1;
  count = null;

  constructor(
    private authService: AuthenticationService,
    private wp: WordpressService,
    private loadingCtrl: LoadingController)
  { }

  async ngOnInit() {
    // let loading = await this.loadingCtrl.create({
    //   message: 'Carregando(A)...'
    // });
    // await loading.present();

    this.wp.getPosts().subscribe(res =>{
      this.count = this.wp.totalPosts;
      this.posts = res;

      // loading.dismiss();
    })
  }

  async loadMore(event){
    this.page++;


    // let loading = await this.loadingCtrl.create({
    //   message: 'Carregando(B)...'
    // });
    // await loading.present();

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
