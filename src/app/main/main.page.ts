import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

@ViewChild('main') main: IonTabs;
  constructor() { }

  ngOnInit() {
    this.main.select('store');
  }
}
