import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: Observable<string>;
  imageCdn;
  url: string;
  imageName: string;
  namaBarang: string;
  hargaBarang: number;
  stockBarang: number;
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
  @ViewChild('cdnButton') cdnButton;

  constructor(
    private alert: AlertController,
    public http: HttpClient,
    public afstore: AngularFirestore,
    public afStorage: AngularFireStorage,
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
    const file = event.target.files[0];
    const fileName = new Date().getTime().toString();
    const filePath = `produk/${fileName}.jpg`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.imageURL = fileRef.getDownloadURL();
        this.imageURL.subscribe(url => (this.url = url));
        this.imageName = fileName;
        this.busy = false;
       } )
    ).subscribe();
  }

  fileCdn(event) {
    this.busy = true;
    const files = event.target.files[0];

    const data = new FormData();
    data.append('file', files);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', '8f7cf0c54abcd5149cf5');

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe( events => {
      console.log(events),
// tslint:disable-next-line: no-string-literal
      this.imageCdn = events['file'];
      this.busy = false;
    });

  }

  setSelected(effect: string) {
    this.activeEffect = this.effects[effect];
  }

  uploadFile() {
    this.fileButton.nativeElement.click();
  }

  uploadCdn() {
    this.cdnButton.nativeElement.click();
  }

  async createPost() {
    this.busy = true;
    const image = this.imageName;
    const nama = this.namaBarang;
    const harga = this.hargaBarang;
    const stock = this.stockBarang;
    const disk = this.diskripsi;
    const url = this.url;
    const activeEffect = this.activeEffect;

    this.afstore.doc(`produk/${image}`).set({
        nama,
        stock,
        harga,
        disk,
        url,
        likes: [],
        // effect: activeEffect
    }, { merge : true });

    this.busy = false;
    this.imageURL = null;
    this.showAlert('Selesai', 'Gambar sukses di Upload!');
    this.router.navigate(['/main/store']);
  }

  createCdn() {
    this.busy = true;

    const image = this.imageCdn;
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
    this.namaBarang = '';
    this.hargaBarang = 0;
    this.stockBarang = 0;
    this.imageCdn = null;
    this.diskripsi = '';
    this.showAlert('Selesai', 'Gambar sukses di Upload!');
    this.router.navigate(['/main/store']);
  }
}
