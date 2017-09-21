import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OneSignal } from '@ionic-native/onesignal';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    private fb: Facebook) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      alert('init');

      this.oneSignalSetup();
      this.faceBookSetup();
      

    });
  }

  

  faceBookSetup() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('/' + res.authResponse.userID + '?fields=id,name,email,first_name,last_name,gender', []).then((detail) => {
          alert(JSON.stringify(detail));
        });
      })
      .catch(e => console.log('Error logging into Facebook', e));


    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  oneSignalSetup() {
    this.oneSignal.startInit('54f780e1-c1e7-4e44-a155-e5917b6af9a5', '122134001408');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }

}

