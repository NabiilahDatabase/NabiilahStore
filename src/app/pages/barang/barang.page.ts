import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-barang',
  templateUrl: './barang.page.html',
  styleUrls: ['./barang.page.scss'],
})
export class BarangPage implements OnInit {

  postID: string;
  produk: any;
  postRef: AngularFirestoreDocument;
  sub;

  heartType = 'heart-empty';
  diskripsi: string;
  harga: number;
  nama: string;
  stock: number;
  url: string;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private user: UserService) { }

  ngOnInit() {
    this.postID = this.route.snapshot.paramMap.get('id');
    this.postRef = this.afs.doc(`produk/${this.postID}`);
    this.sub = this.postRef.valueChanges().subscribe(val => {
      this.produk = val;
      this.diskripsi = val.disk;
      this.harga = val.harga;
      this.nama = val.nama;
      this.stock = val.stock;
      this.url = val.url;
      this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty';
    });
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleHeart() {
    if (this.heartType === 'heart-empty') {
      this.postRef.update({
        likes: firestore.FieldValue.arrayUnion(this.user.getUID())
      });
    } else {
      this.postRef.update({
        likes: firestore.FieldValue.arrayRemove(this.user.getUID())
      });
    }
  }
}
