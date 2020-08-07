import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IgrejaPage } from './igreja.page';

const routes: Routes = [
  {
    path: '',
    component: IgrejaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IgrejaPageRoutingModule {}
