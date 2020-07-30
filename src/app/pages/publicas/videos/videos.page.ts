import { Component, OnInit } from '@angular/core';


//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { GlobalConstants } from 'src/app/common/global-constants';


import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//import 'rxjs/add/operator/map';
import xml2js from 'xml2js';



@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  feeds: Array<string>;
  private videosRefreshTime: number = 600; // seconds
  xmlItems: any;

  // OK https://www.googleapis.com/youtube/v3/search?
  // channelId=UCexdKUQ25mhIv42KS6nVgLQ
  // &order=date
  // &part=snippet
  // &type=video
  // &maxResults=10
  // &key=AIzaSyAihjQWgnE9RURPK_atUU7QPkwE44qK7nI

  // 

  constructor(
    //    private youtube: YoutubeVideoPlayer,
    public http: HttpClient,
    public toastCtrl: ToastController,
    private _sanitizer: DomSanitizer
    
  ) { }


  


  ngOnInit() {
  }



  teste() {

    // this.youtube.openVideo('myvideoid');
  }


  loadXML()
  {
     this.http.get(GlobalConstants.canalYoutubeXML, 
     {
       headers: new HttpHeaders()
       .set('Content-Type', 'text/xml') 
       .append('Access-Control-Allow-Methods', 'GET') 
       .append('Access-Control-Allow-Origin', '*')
       .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"), 
       responseType:'text'
     })
     .subscribe((data)=>
     {
        this.parseXML(data)
        .then((data)=>
        {
           this.xmlItems = data;
        });
     });
  }


  parseXML(data: string)
  {
     return new Promise(resolve =>
     {
        let arr    = [],
            parser = new xml2js.Parser(
            {
               trim: true,
               explicitArray: true
            });

        parser.parseString(data, function (err, result) 
        {

          // console.dir( result);
           let obj = result.feed; //root xml
           for(let k in obj.entry) // entry -> nós com os dados dos vídeos
           {
              let item = obj.entry[k];
              


              console.dir( "item::");
              console.dir( item );


              console.dir( "item['media:group']::");
              console.dir( item['media:group']);

              let mediagroup:[] = item['media:group'];


              console.dir( "mediagroup[0]::");
              console.dir( mediagroup['medi']);
              
              
              arr.push({  
                 id           : item.id,
                 title        : item['title'],
                 videoID      : item['yt:videoId'],
                 thumbnail    : "https://i1.ytimg.com/vi/"+item['yt:videoId']+"/hqdefault.jpg"
                 
              });
           }
            
           resolve(arr);
        });
     });
  }




ionViewDidEnter(){

  this.loadXML();

}


itemSelected(event: any, feed: any) {
  let oVideo: string;
  console.log("feed.id:" + feed.id);

  oVideo = feed.id;
  // OK ??? this.youtube.openVideo(oVideo+''); //  hack: must conctenate as a string

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