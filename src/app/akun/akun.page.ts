import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
})

export class AkunPage implements OnInit {
  imageURL: string;
  diskripsi: string;
  busy = false;

  @ViewChild('fileButton') fileButton;

  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService,
    private alert: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  fileChanged(event) {
    this.busy = true;
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
      this.busy = false;
    });
  }

  uploadFile() {
    this.fileButton.nativeElement.click();
  }

  async createPost() {
    this.busy = true;
    const image = this.imageURL;
    const disk = this.diskripsi;

    this.afstore.doc(`users/${this.user.getUID()}`).set({
      posts: firestore.FieldValue.arrayUnion(image)
    }, { merge : true });

    this.afstore.doc(`posts/${image}`).set({
        disk,
        author: this.user.getUsername(),
        likes: []
    }, { merge : true });
    this.busy = false;
    this.imageURL = '';
    this.diskripsi = '';
    this.showAlert('Selesai', 'Gambar sukses di Upload!');
    this.router.navigate(['/main/store']);
  }
}
