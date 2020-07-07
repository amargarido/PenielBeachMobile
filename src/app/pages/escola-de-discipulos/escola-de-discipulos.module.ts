import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscolaDeDiscipulosPageRoutingModule } from './escola-de-discipulos-routing.module';

import { EscolaDeDiscipulosPage } from './escola-de-discipulos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscolaDeDiscipulosPageRoutingModule
  ],
  declarations: [EscolaDeDiscipulosPage]
})
export class EscolaDeDiscipulosPageModule {}
