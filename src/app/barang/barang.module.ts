import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BarangPage } from './barang.page';
import { ShareModule } from '../share.module';

const routes: Routes = [
  {
    path: '',
    component: BarangPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [BarangPage]
})
export class BarangPageModule {}
