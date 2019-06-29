import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FunctionsRegionToken, AngularFireFunctionsModule } from '@angular/fire/functions';

import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ShareModule } from './share.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicHeaderParallaxModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    ShareModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: StorageBucket, useValue: 'nabiilah-data.appspot.com' },
    { provide: FunctionsRegionToken, useValue: 'us-central1' },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
