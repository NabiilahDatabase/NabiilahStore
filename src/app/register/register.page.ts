import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  hp = '';
  username = '';
  password = '';
  upassword = '';

  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public alert: AlertController,
    public router: Router,
    public user: UserService,
    ) {
      firebase.auth().languageCode = 'id';
    }

  ngOnInit() {
  }

  async register() {
    const { hp, username, password, upassword } = this;

    if (password !== upassword) {
      this.showAlert('Error', 'Password yg anda masukkan salah!');
      return console.error('Password tidak sama!');
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@nabiilah.com', password);
      this.afstore.doc(`users/${res.user.uid}`).set({username});
      this.user.setUser({
        username,
        uid: res.user.uid
      });
      this.showAlert('Sukses!', 'Akun ' + username + ' berhasil dibuat');
      this.router.navigate(['/main']);
    } catch (err) {
      console.dir(err);
      this.showAlert('Error!', err.message);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
