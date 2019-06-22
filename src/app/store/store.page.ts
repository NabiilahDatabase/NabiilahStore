import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  mainuser: AngularFirestoreDocument;
  userPost: any;
  sub;
  posts;
  username: string;
  profilePic: string;

  constructor(
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router) {
    this.mainuser = this.afs.doc(`users/${this.user.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.posts = event.posts;
      this.username = event.username;
      this.profilePic = event.profilePic;
    });
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goTo(postID: string) {
    this.router.navigate(['/main/barang/' + postID.split('/')[0]]);
  }

  ngOnInit() {
  }

}
