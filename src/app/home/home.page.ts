import { Component } from '@angular/core';
import { NgFormSelectorWarning } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public hp: any;
  public pass: any;
  nomer: any;
  password: any;

  constructor() {}

  login() {
    this.nomer = this.hp;
    this.password = this.pass;
  }

}
