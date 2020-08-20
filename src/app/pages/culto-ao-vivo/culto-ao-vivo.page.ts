import { Component, OnInit/*, LoadingController*/ } from '@angular/core';

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
    public http       : HttpClient,
    public toastCtrl  : ToastController,
//    public loadingCtrl: LoadingController
  ) { }




  ngOnInit() {
  }



  
  ionViewDidEnter(){

    this.fetchContent();
  }

  fetchContent ():void {
    // let loading = this.loadingCtrl.create({
    //   content: 'Buscando vÃ­deos...'
    // });

//    loading.present();

    this.http.get("GlobalConstants.cultoAoVivoURL")
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


  } // itemSelected()



} // class

