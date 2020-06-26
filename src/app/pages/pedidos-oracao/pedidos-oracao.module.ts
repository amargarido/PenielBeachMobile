import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosOracaoPageRoutingModule } from './pedidos-oracao-routing.module';

import { PedidosOracaoPage } from './pedidos-oracao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosOracaoPageRoutingModule
  ],
  declarations: [PedidosOracaoPage]
})
export class PedidosOracaoPageModule {}
