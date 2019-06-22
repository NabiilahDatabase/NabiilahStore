import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slides = [
    {
      img: 'assets/icon/shopping-bag.svg',
      title: 'Tanpa Stock & Modal',
// tslint:disable-next-line: max-line-length
      desc: '<strong>Nabiilahstore</strong> menggunakan sistem dropshiper; yakni semua stock barang, packing hingga pengiriman kami yg melakukan, dan reseller hanya tinggal menjualkan barang'
    },
    {
      img: 'assets/icon/dress.svg',
      title: 'Barang Original',
// tslint:disable-next-line: max-line-length
      desc: '<strong>Nabillahstore</strong> menjual produk gamis syar’i, dress, kaftan dan hijab branded yang original langsung dari produsen dengan bahan berkualitas dan harga yang murah'
    },
    {
      img: 'assets/icon/mobile.svg',
      title: 'Order Cepat!',
// tslint:disable-next-line: max-line-length
      desc: '<strong>Nabiilahstore</strong> menggunakan sistem order berbasis aplikasi sehingga reseller dengan cepat dapat memesan setiap barang tanpa harus menunggu balasan dari cs kami'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
