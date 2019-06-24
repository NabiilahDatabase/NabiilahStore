import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string;
  diskripsi: string;
  busy = false;

  scaleCrop = '-/scale_crop/200x200';
  effects = {
    effect1: '',
    effect2: '-/filter/fenralan/150/',
    effect3: '-/filter/vevera/150/',
    effect4: '-/filter/carris/150/',
    effect5: '-/filter/misiara/150/'
  };
  activeEffect = this.effects.effect1;

  @ViewChild('fileButton') fileButton;

  constructor(
    private alert: AlertController,
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService,
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

  setSelected(effect: string) {
    this.activeEffect = this.effects[effect];
  }

  uploadFile() {
    this.fileButton.nativeElement.click();
  }

  async createPost() {
    this.busy = true;
    const image = this.imageURL;
    const disk = this.diskripsi;
    const activeEffect = this.activeEffect;

    this.afstore.doc(`users/${this.user.getUID()}`).set({
      posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`)
    }, { merge : true });

    this.afstore.doc(`posts/${image}`).set({
        disk,
        author: this.user.getUsername(),
        likes: [],
        effect: activeEffect
    }, { merge : true });

    this.busy = false;
    this.imageURL = '';
    this.diskripsi = '';
    this.showAlert('Selesai', 'Gambar sukses di Upload!');
    this.router.navigate(['/main/store']);
  }

}
