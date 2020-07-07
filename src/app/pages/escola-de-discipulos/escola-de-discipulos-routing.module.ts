import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolaDeDiscipulosPage } from './escola-de-discipulos.page';

const routes: Routes = [
  {
    path: '',
    component: EscolaDeDiscipulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolaDeDiscipulosPageRoutingModule {}
