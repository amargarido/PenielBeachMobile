import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IgrejaPageRoutingModule } from './igreja-routing.module';

import { IgrejaPage } from './igreja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IgrejaPageRoutingModule
  ],
  declarations: [IgrejaPage]
})
export class IgrejaPageModule {}
