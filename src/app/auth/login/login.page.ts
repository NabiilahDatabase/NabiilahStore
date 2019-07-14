import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { PopupService } from '../../services/popup.service';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  private userData: Observable<User>;
  data: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private user: UserService,
    private popup: PopupService
  ) { }

  ngOnInit() {
  }

  onLogin(uname, password) {
    firebase.auth().signInWithEmailAndPassword(uname + '@nabiilah.com', password)
      .then(data => {
        this.userData = this.user.getUser(data.user.uid);
        this.userData.subscribe(get => {
          console.log('userData: ' + get.uid);
          this.user.setUser(get);
          this.popup.showToast('Selamat datang ' + uname);
          this.router.navigate(['/main']);
          });
      })
      .catch(error => {
        console.log(error.message);
        this.popup.showToast(error.message);
      });
    }

  async login() {
    const { username, password } = this;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@nabiilah.com', password);
      if (res.user) {
        console.log(res);
        this.user.getUser(res.user.uid).subscribe(data => {
          this.data = data;
        });
        this.user.setUser(this.data);
        this.router.navigate(['/main']);
      }
    } catch (err) {
      console.dir(err);
      if (err.code === 'auth/user-not-found') {
        console.log('User tidak ditemukan');
        this.popup.showAlert('Error!', 'Username atau Password salah!');
      }
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
