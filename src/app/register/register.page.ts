import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

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
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register() {
    const { hp, email, password, upassword } = this;

    if (password !== upassword) {
      return console.error('Password tidak sama!')
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log(res);
    } catch (err) {
      console.dir(err);
    }
  }
}
