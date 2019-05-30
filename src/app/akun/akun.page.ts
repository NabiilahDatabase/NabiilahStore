import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
})

export class AkunPage implements OnInit {
  imageURL: string;
  diskripsi: string;
  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  fileChanged(event) {
    const files = event.target.files;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', '8f7cf0c54abcd5149cf5');

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe( events => {
      console.log(events),
// tslint:disable-next-line: no-string-literal
      this.imageURL = events['file'];
    });
  }

  createPost() {
    const image = this.imageURL;
    const disk = this.diskripsi;

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      post: firestore
    });
  }
}
