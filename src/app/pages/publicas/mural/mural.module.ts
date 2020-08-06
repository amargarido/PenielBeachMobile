import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuralPageRoutingModule } from './mural-routing.module';

import { MuralPage } from './mural.page';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuralPageRoutingModule
  ],
  declarations: [MuralPage,SafeHtmlPipe]
})
export class MuralPageModule {}
