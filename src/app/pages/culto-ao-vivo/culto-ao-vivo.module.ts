import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CultoAoVivoPageRoutingModule } from './culto-ao-vivo-routing.module';

import { CultoAoVivoPage } from './culto-ao-vivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CultoAoVivoPageRoutingModule
  ],
  declarations: [CultoAoVivoPage]
})
export class CultoAoVivoPageModule {}
