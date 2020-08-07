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
          this.feeds[index]['youtubeVideo'] = "<iframe width='560'  height='315' src='https://www.youtube.com/embed/'"+ this.feeds[index]['id'].substr(9) + " frameborder='0' allowfullscreen></iframe>";
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


/*

import { Component }           from '@angular/core';
import { NavController , LoadingController, ToastController } from 'ionic-angular';
import { Http }                from '@angular/http';
import X2JS                    from 'x2js';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Network }             from '@ionic-native/network';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';


declare var Connection;


  constructor(
    public navCtrl    : NavController,
    public connServ   : ConnectivityService,

    private youtube   : YoutubeVideoPlayer,
    private network   : Network ){} // constructor


  ionViewDidEnter(){
    if( this.connServ.isOnline()){
      if (this.connServ.isTimeVideosToReload()){
        this.connServ.setInnerTimerVideos( this.videosRefreshTime); // add seconds
        this.fetchContent();

      }
    } else {
      this.mostraFaltaConexao();
      this.connServ.setInnerTimerVideos( 0 ); //refresh immediately

      let connectSubscriptionVid = this.network.onConnect().subscribe(() => {
        console.log('network connected(videos)!');
        this.connServ.setInnerTimerVideos( this.videosRefreshTime); // add seconds
        this.fetchContent();

        connectSubscriptionVid.unsubscribe();
      });
    }
  }



  mostraFaltaConexao(): void {
    let toast = this.toastCtrl.create({
          message: 'Sem acesso aos VÃ­deos. Tente novamente em instantes.',
          duration: 4000,
          position: 'top'
        });
    toast.present();
  }

  fetchContent ():void {
     let loading = this.loadingCtrl.create({
       content: 'Buscando vÃ­deos...'
     });

     loading.present();

     this.http.get(this.url)
         .timeout(30000)
         .map(res => res.text())
         .subscribe(data => {

           let parser : any = new X2JS({attributePrefix : "media"});
           let json = parser.xml2js(data);

           this.feeds = json.feed.entry; // teste
           loading.dismiss();
         },
         (err)=>{ loading.dismiss(); this.mostraFaltaConexao(); this.connServ.setInnerTimerVideos( 0 //refresh immediately);}
       );
   } // fetchContent()

   itemSelected(event, feed) {
     let oVideo : string;
     console.log("feed.videoId:"+feed.videoId);

     oVideo = feed.videoId;
     this.youtube.openVideo(oVideo+''); //  hack: must conctenate as a string

   } // itemSelected()


} // class


*/