import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComunidadePageRoutingModule } from './comunidade-routing.module';

import { ComunidadePage } from './comunidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunidadePageRoutingModule
  ],
  declarations: [ComunidadePage]
})
export class ComunidadePageModule {}
