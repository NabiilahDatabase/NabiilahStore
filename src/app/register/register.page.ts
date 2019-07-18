import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  hp = '';
  email = '';
  nama =  '';

  public recaptchaVerifier: firebase.auth.ApplicationVerifier;

  constructor(
    private afAuth: AngularFireAuth,
    private afstore: AngularFirestore,
    private alert: AlertController,
    private router: Router,
    private user: UserService,
    private navCtrl: NavController,
    private zone: NgZone
    ) {
      firebase.auth().languageCode = 'id';
    }

  ngOnInit() {
  }

  async register(phoneNumber: string) {
    const { hp, email, nama } = this;

    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'invisible',
      callback: response => {
        // reCAPTCHA solved - will proceed with submit function
      }
    });

    firebase.auth().signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier)
      .then(async confirmationResult => {
        await this.alert.create({
          header: 'Enter the Confirmation code',
          inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
          buttons: [
            { text: 'Cancel',
              handler: data => { console.log('Cancel clicked'); }
            },
            { text: 'Send',
              handler: data => {
                confirmationResult.confirm(data.confirmationCode)
                .then(result => {
                  // User sign in with correct verification code
                  this.afstore.doc(`users/${result.user.uid}`).set({
                    nama,
                    email,
                    hp,
                    uid: result.user.uid
                  });
                  this.user.setUser({
                    nama,
                    email,
                    hp,
                    uid: result.user.uid
                  });
                  console.log(result.user);
                  this.zone.run(async () => {
                    await this.router.navigate(['/main']);
                  });
                }).catch(error => {
                  // User couldn't sign in (bad verification code?)
                  // ...
                });
              }
            }
          ]
        }).then(alert => alert.present());
      })
    .catch((error) => {
      console.error('SMS not sent', error);
    });

      /*
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, hp);
      this.afstore.doc(`users/${res.user.uid}`).set({
        email,
        uid: res.user.uid,
        nama
      });
      this.user.setUser({
        email,
        uid: res.user.uid,
        nama,
        hp
      });
      */
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
