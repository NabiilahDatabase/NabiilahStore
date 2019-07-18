import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainPage } from './main.page';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
        children: [
            { path: 'order', loadChildren: '../main/order/order.module#OrderPageModule' },
            { path: 'store', loadChildren: '../main/store/store.module#StorePageModule' },
            { path: 'akun', loadChildren: '../main/akun/akun.module#AkunPageModule' },
            { path: 'barang/:id', loadChildren: '../barang/barang.module#BarangPageModule' },
            { path: 'edit-profile', loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'cart', loadChildren: '../cart/cart.module#CartPageModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }


