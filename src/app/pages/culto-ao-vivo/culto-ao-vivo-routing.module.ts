import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CultoAoVivoPage } from './culto-ao-vivo.page';

const routes: Routes = [
  {
    path: '',
    component: CultoAoVivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CultoAoVivoPageRoutingModule {}
