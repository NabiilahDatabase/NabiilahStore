import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
})

export class AkunPage implements OnInit {
  busy = false;

  mainuser: AngularFirestoreDocument;
  userPost: any;
  sub;
  posts;
  username: string;
  profilePic: string;

  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService,
    private router: Router
    ) {
      this.mainuser = this.afstore.doc(`users/${this.user.getUID()}`);
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

  goTo(page: string) {
    this.router.navigate([page]);
  }

  ngOnInit() {
  }

}
