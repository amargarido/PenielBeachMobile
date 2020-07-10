import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
//  user = this.authService.getCurrentUser();


  constructor(
    private authService: AuthenticationService,
    private menu: MenuController,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) 
    { }



  ngOnInit() {

    this.menu.enable(true);

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ''
    });
  }
  

  loginUser(){

    this.menu.enable(true);


    this.authService.doLogin(
        this.userForm.value.username, 
        this.userForm.value.password)
      .subscribe(
      (resp) => {

        this.authService.registerLogin(resp); 
      },
      (err) => {
        this.showError(err);
      }
    );
  }

  // TODO signUp() 
  // TODO openPwReset() 
  // TODO resetPw(usernameOrEmail) 


  async showError(err) {
    const alert = await this.alertCtrl.create({
      header: err.error.code,
      subHeader: err.error.data.status,
      message: err.error.message,
      buttons: ['OK']
    });
    await alert.present();
  }
  


}
