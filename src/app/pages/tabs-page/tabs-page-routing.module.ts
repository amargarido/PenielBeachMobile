import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagePage } from './tabs-page.page';
import { AuthGuardService } from '../../services/auth-guard.service';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPagePage,
    children: [
      {
        path: 'pedidosoracao',
        loadChildren: () => import('../pedidos-oracao/pedidos-oracao.module').then(m => m.PedidosOracaoPageModule)
      },
      {
        path: 'comunidade',
        loadChildren: () => import('../comunidade/comunidade.module').then(m => m.ComunidadePageModule)
      },
      {
        path: 'atividades',
        loadChildren: () => import('../atividades/atividades.module').then(m => m.AtividadesPageModule)
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
    redirectTo: '/app/tabs/atividades',
    pathMatch: 'full'
    ,    canActivate: [AuthGuardService]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagePageRoutingModule {}
