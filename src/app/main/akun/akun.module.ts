import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AkunPage } from './akun.page';
import { ShareModule } from '../../share.module';

const routes: Routes = [
  {
    path: '',
    component: AkunPage
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
  declarations: [AkunPage]
})
export class AkunPageModule {}
