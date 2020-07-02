import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { TutorialCheckService }    from './services/tutorial-check.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app', // tutorial
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsPagePageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialPageModule)
    ,canLoad: [TutorialCheckService]
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'atividades',
    loadChildren: () => import('./pages/atividades/atividades.module').then( m => m.AtividadesPageModule)
    ,canActivate: [AuthGuardService]
  },
  {
    path: 'pedidos-oracao',
    loadChildren: () => import('./pages/pedidos-oracao/pedidos-oracao.module').then( m => m.PedidosOracaoPageModule)
    ,canActivate: [AuthGuardService]
  },
  {
    path: 'comunidade',
    loadChildren: () => import('./pages/comunidade/comunidade.module').then( m => m.ComunidadePageModule)
    ,canActivate: [AuthGuardService]
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }