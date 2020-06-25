import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
// https://edupala.com/ionic-6-crud-on-wordpress-post/
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toast: ToastController) { }

  async showToast(message: string, type: string) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      color: type === 'success' ? 'primary' : 'danger'
    });
    toast.present();
  }
}
