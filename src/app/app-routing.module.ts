import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { TutorialCheckService }    from './services/tutorial-check.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app', 
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
    path: 'videos', // Público
    loadChildren: () => import('./pages/publicas/videos/videos.module').then( m => m.VideosPageModule)
  },
  {
    path: 'mural', // Público
    loadChildren: () => import('./pages/publicas/mural/mural.module').then( m => m.MuralPageModule)
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
    path: 'culto-ao-vivo',
    loadChildren: () => import('./pages/culto-ao-vivo/culto-ao-vivo.module').then( m => m.CultoAoVivoPageModule)
    ,canActivate: [AuthGuardService]
  },
  {
    path: 'escola-de-discipulos',
    loadChildren: () => import('./pages/escola-de-discipulos/escola-de-discipulos.module').then( m => m.EscolaDeDiscipulosPageModule)
    ,canActivate: [AuthGuardService]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/publicas/inicio/inicio.module').then( m => m.LandPagePageModule)
    
  },
  {
    path: 'igreja',
    loadChildren: () => import('./pages/igreja/igreja.module').then( m => m.IgrejaPageModule)
    ,canActivate: [AuthGuardService]
  },
  {
    path: 'membros',
    loadChildren: () => import('./pages/membros/membros.module').then( m => m.MembrosPageModule)
  },
  {
    path: 'mensagens',
    loadChildren: () => import('./pages/mensagens/mensagens.module').then( m => m.MensagensPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }