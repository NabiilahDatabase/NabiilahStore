import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  hp = '';
  email = '';
  password = '';
  upassword = '';
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async register() {
    const { hp, email, password, upassword } = this;

    if (password !== upassword) {
      this.showAlert('Error', 'Password yg anda masukkan salah!');
      return console.error('Password tidak sama!');
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log(res);
      this.showAlert('Sukses!', 'Akun ' + email + ' berhasil dibuat');
      this.router.navigate(['/login']);
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
