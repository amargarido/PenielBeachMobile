import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MuralPageRoutingModule } from './mural-routing.module';
import { MuralPage } from './mural.page';
import { SharedModule } from '../../../common/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HttpClientModule,
    MuralPageRoutingModule
  ],
  declarations: [MuralPage]
})
export class MuralPageModule {}
