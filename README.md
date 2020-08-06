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






