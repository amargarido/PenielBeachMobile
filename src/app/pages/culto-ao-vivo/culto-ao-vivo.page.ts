import { Component, OnInit/*, LoadingController*/ } from '@angular/core';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { GlobalConstants } from 'src/app/common/global-constants';

//declare var Connection;

@Component({
  selector: 'app-culto-ao-vivo',
  templateUrl: './culto-ao-vivo.page.html',
  styleUrls: ['./culto-ao-vivo.page.scss'],
})
export class CultoAoVivoPage implements OnInit {

  feeds: Array<string>;
  private videosRefreshTime: number = 600; // seconds


  constructor(
    private youtube: YoutubeVideoPlayer,
    public http       : HttpClient,
    public toastCtrl  : ToastController,
//    public loadingCtrl: LoadingController
  ) { }




  ngOnInit() {
  }


  
  teste(){

    this.youtube.openVideo('myvideoid');
  }

  
  ionViewDidEnter(){

    this.fetchContent();
  }

  fetchContent ():void {
    // let loading = this.loadingCtrl.create({
    //   content: 'Buscando vÃ­deos...'
    // });

//    loading.present();

    this.http.get(GlobalConstants.cultoAoVivoURL)
        .subscribe((data: any) => {

          // console.log('Culto ao vivo data:');
          // console.log(data);

          console.log('Culto ao vivo data.items:');
          console.log(data['items']);

          this.feeds = data['items'];

  //        loading.dismiss();
        },
        (err: any)=>{ 

          console.log('ERRO culto ao vivo:');
          console.log(err);
          // loading.dismiss(); 
          // this.mostraFaltaConexao(); 
          // this.connServ.setInnerTimerVideos( 0 );//refresh immediately);}
        });
  } // fetchContent()

  itemSelected(event:any,  feed:any) {
    let oVideo : string;
    console.log("feed.id:"+feed.id);

    oVideo = feed.id;
    this.youtube.openVideo(oVideo+''); //  hack: must conctenate as a string

  } // itemSelected()



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