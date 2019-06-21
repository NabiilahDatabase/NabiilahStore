import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

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
  coba;
  task;
  username: string;
  profilePic: string;

  constructor(
    private aff: AngularFireFunctions,
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router) {
    this.mainuser = this.afs.doc(`users/${this.user.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.posts = event.posts;
      console.log('posting reg');
    });
    const getPost = this.aff.httpsCallable('getPost');
    this.task = getPost({}).subscribe(data => {
      this.coba = data;
      console.log('posting firebase');
    });
  }

  goTo(postID: string) {
    this.router.navigate(['/main/barang/' + postID.split('/')[0]]);
  }

  ngOnInit() {
  }

}
