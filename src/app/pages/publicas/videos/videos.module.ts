import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideosPageRoutingModule } from './videos-routing.module';

import { VideosPage } from './videos.page';

import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideosPageRoutingModule
  ],
  declarations: [VideosPage, SafeHtmlPipe]
})
export class VideosPageModule {}
