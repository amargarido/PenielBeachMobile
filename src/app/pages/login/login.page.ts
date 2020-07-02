import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private menu: MenuController,
     ) { }

  ngOnInit() {
    this.menu.enable(true);
  }
  

  loginUser(){
    this.menu.enable(true);


    this.authService.doLogin()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
  //      const keys = resp.headers.keys();
        // this.headers = keys.map(key =>
        //   `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        //this.config = { ...  };


        this.authService.registerLogin(resp); 

      });




    //this.authService.login(); // todo ?
  }

  showConfigResponse() {
  }
  


}
