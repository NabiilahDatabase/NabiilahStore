import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
})

export class AkunPage implements OnInit {

  public imageURL: string;
  constructor(public http: HttpClient) { }

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
      this.imageURL = events['file'];
    });
  }
}
