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
    this.authService.login('username_aqui'); // todo
  }

}
