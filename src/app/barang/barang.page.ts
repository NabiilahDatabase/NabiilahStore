import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-barang',
  templateUrl: './barang.page.html',
  styleUrls: ['./barang.page.scss'],
})
export class BarangPage implements OnInit {

  postID: string;
  post: any;
  heartType = 'heart-empty';

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }

  ngOnInit() {
    this.postID = this.route.snapshot.paramMap.get('id');
    this.post = this.afs.doc(`posts/${this.postID}`).valueChanges();
  }

  toggleHeart() {
    this.heartType = this.heartType === 'heart' ? 'heart-empty' : 'heart';
  }
}
