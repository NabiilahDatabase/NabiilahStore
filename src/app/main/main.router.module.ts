import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainPage } from './main.page';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
        children: [
            { path: 'order', loadChildren: '../order/order.module#OrderPageModule' },
            { path: 'store', loadChildren: '../store/store.module#StorePageModule' },
            { path: 'akun', loadChildren: '../akun/akun.module#AkunPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }

