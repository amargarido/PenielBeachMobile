import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagePage } from './tabs-page.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPagePage,
    children: [
      {
        path: 'atividades',
        loadChildren: () => import('../atividades/atividades.module').then(m => m.AtividadesPageModule)
      },
      {
        path: 'pedidosoracao',
        loadChildren: () => import('../pedidos-oracao/pedidos-oracao.module').then(m => m.PedidosOracaoPageModule)
      },
      {
        path: 'comunidade',
        loadChildren: () => import('../comunidade/comunidade.module').then(m => m.ComunidadePageModule)
      },
      {
        path: '',
        redirectTo: '/app/tabs/atividades',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/tabs/atividades',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagePageRoutingModule {}
