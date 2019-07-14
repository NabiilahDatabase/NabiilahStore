import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument;
  sub;
  username: string;
  password: string;
  newpass: string;
  profilePic: string;
  busy = false;

  @ViewChild('fileBtn') fileBtn: {
    nativeElement: HTMLInputElement
  };

  constructor(
    private http: HttpClient,
    private afstore: AngularFirestore,
    private user: UserService,
    private alert: AlertController,
    private router: Router
  ) {
    this.mainuser = afstore.doc(`users/${this.user.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.username = event.username;
      this.profilePic = event.profilePic;
    });
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

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

  updateProfilePic() {
    this.fileBtn.nativeElement.click();
  }

  uploadPic(event) {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', '8f7cf0c54abcd5149cf5');

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe( events => {
// tslint:disable-next-line: no-string-literal
      const uuid = events['file'];
      this.mainuser.update({
        profilePic: uuid
      });
    });
  }

  async updateDetails() {
    this.busy = true;

    if (!this.password && !this.newpass) {
      this.showAlert('Error', 'Password belum diisi lengkap kak!');
    }

    try {
      await this.user.reAuth(this.user.getUsername(), this.password);
    } catch (error) {
      return this.showAlert('Error', 'Password Salah!');
    }

    if (this.newpass) {
      await this.user.updatePassword(this.newpass);
    }

    if (this.username !== this.user.getUsername()) {
      await this.user.updateEmail(this.username + '@nabiilah.com');
      this.mainuser.update({
        username: this.username
      });
    }

    this.username = '';
    this.password = '';
    this.newpass = '';
    this.busy = false;

    await this.showAlert('Selesai', 'Data sudah diperbarui!');
    this.router.navigate(['/main/store']);
  }
}
