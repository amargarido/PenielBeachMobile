import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandPagePageRoutingModule } from './inicio-routing.module';

import { LandPagePage } from './inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandPagePageRoutingModule
  ],
  declarations: [LandPagePage]
})
export class LandPagePageModule {}
