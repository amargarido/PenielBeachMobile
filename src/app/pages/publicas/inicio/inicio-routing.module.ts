import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandPagePage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: LandPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandPagePageRoutingModule {}
