import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosOracaoPage } from './pedidos-oracao.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosOracaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosOracaoPageRoutingModule {}
