import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  userPost: any;

  constructor(
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router) {
    const posts = this.afs.doc(`users/${this.user.getUID()}`);
    this.userPost = posts.valueChanges();
  }

  goTo(postID: string) {
    this.router.navigate(['/main/barang/' + postID.split('/')[0]]);
  }

  ngOnInit() {
  }

}
