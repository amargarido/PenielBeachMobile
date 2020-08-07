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





