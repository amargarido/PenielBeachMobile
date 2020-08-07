import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { GlobalConstants } from 'src/app/common/global-constants';

import xml2js from 'xml2js';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  feeds: Array<string>;
  xmlItems: any;

  // OK https://www.googleapis.com/youtube/v3/search?
  // channelId=UCexdKUQ25mhIv42KS6nVgLQ
  // &order=date
  // &part=snippet
  // &type=video
  // &maxResults=10
  // &key=AIzaSyAihjQWgnE9RURPK_atUU7QPkwE44qK7nI


  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }



  ionViewDidEnter() {
    this.fetchContent();
  }


  itemSelected(event: any, feed: any) {
    let oVideo: string;
    console.log("feed.id:" + feed.id);

    oVideo = feed.id;
  }


  fetchContent(): void {
    // let loading = this.loadingCtrl.create({
    //   content: 'Buscando vÃ­deos...'
    // });

    //    loading.present();

    this.http.get(GlobalConstants.canalYoutubeXML)
      .subscribe((data: any) => {

        this.feeds = data['entry'];

        for (let index in this.feeds) {

          //        console.log(this.feeds[index]['id']);  // output: Apple Orange Banana 
          this.feeds[index]['thumbnail'] = "https://i1.ytimg.com/vi/" + this.feeds[index]['id'].substr(9) + "/hqdefault.jpg";
          this.feeds[index]['youtubeVideo'] = "<iframe title=\"Vídeo Explicativo\" width=\"256\" height=\"144\" src=\"https://www.youtube.com/embed/"+this.feeds[index]['id'].substr(9)+"?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        
          // v

          // "<iframe title=\"Vídeo Explicativo\" width=\"640\" height=\"360\" src=\"https://www.youtube.com/embed/ojfhSSdUk2o?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        }


      },
        (err: any) => {

          console.log('ERRO videos page:');
          console.log(err);
          // loading.dismiss(); 
          // this.mostraFaltaConexao(); 
          // this.connServ.setInnerTimerVideos( 0 );//refresh immediately);}
        });
  } // fetchContent()





} // class
