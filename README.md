# PenielBeachMobile
Peniel Beach Church - public mobile Ionic 5 APP

## Teste 

Desligar o cache do https://dash.cloudflare.com


## Land Page

https://penielbeach.com.br/wp-json/buddypress/v1/activity?_embed&user_id=2


## XML reader

(yes) npm install --save xml2js

(yes) npm install --save timers


(NO !  nao usar em conjunto) npm install --save @types/xml2js
(sem diferenca) npm install --save streams



## Teste plataforma

     if (this.platform.is('hybrid')) {

       console.log('Platform: hybrid');
     } else if (this.platform.is('android')) {
       console.log('Platform: android');
     } else if (this.platform.is('capacitor')) {
       console.log('Platform: capacitor');
     } else if (this.platform.is('pwa')) {
       console.log('Platform: pwa');
     } else {
       console.log('Platform?:'+ this.platform.platforms());
     }


## XML API Reader

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



////////////

  loadXML() {
    this.http.get(GlobalConstants.canalYoutubeXML,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
          });
      });
  }


  parseXML(data: string) {
    
    return new Promise(resolve => {
      let arr = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });

      parser.parseString(data, function (err, result) {

        // console.dir( result);
        let obj = result.feed; //root xml
        for (let k in obj.entry) // entry -> nós com os dados dos vídeos
        {
          let item = obj.entry[k];



          // console.dir( "item::");
          // console.dir( item );
          // console.dir( "item['media:group']::");
          // console.dir( item['media:group']);
          // let mediagroup:[] = item['media:group'];
          // console.dir( "mediagroup[0]::");
          // console.dir( mediagroup['medi']);


          arr.push({
            id: item.id,
            title: item['title'],
            videoID: item['yt:videoId'],
            thumbnail: "https://i1.ytimg.com/vi/" + item['yt:videoId'] + "/hqdefault.jpg"

          });
        }

        resolve(arr);
      });
    });
  }

## Video Sizes

https://metricool.com/youtube-image-and-videos-dimensions/


## Sample private posts

 getPrivatePosts() {
   return this.http.get<any[]>(GlobalConstants.siteApiURL +'/wp/v2/posts?_embed&status=private').pipe(
     map(data => {
       for (let post of data) {
         if (post['_embedded']['wp:featuredmedia']) {
           post.media_url =
             post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
         }
       }
       return data;
     })
   );
 }

## Appcomponents - testa versão mais recente

ngOnInit...

 this.swUpdate.available.subscribe(async res => {
   const toast = await this.toastCtrl.create({
     message: 'Update available!',
     position: 'bottom',
     buttons: [
       {
         role: 'cancel',
         text: 'Reload'
       }
     ]
   });
   await toast.present();
   toast
     .onDidDismiss()
     .then(() => this.swUpdate.activateUpdate())
     .then(() => window.location.reload());
 });

