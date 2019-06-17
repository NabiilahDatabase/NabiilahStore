import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  userPost: any;

  constructor(
    private afs: AngularFirestore,
    private user: UserService) {
    const posts = this.afs.doc(`users/${this.user.getUID()}`);
    this.userPost = posts.valueChanges();
  }

  ngOnInit() {
  }

}
