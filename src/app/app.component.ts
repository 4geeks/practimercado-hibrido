import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Api } from "../services/api";
import { LoginComponent } from '../pages/login/login.component';
import { SideMenuComponent } from '../pages/sidemenu/sidemenu.component';

@Component({
	templateUrl: 'app.html',
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;

	constructor(public platform: Platform, public storage: Storage,
				public _SplashScreen: SplashScreen) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			this._SplashScreen.hide();
			Splashscreen.hide();
			this.storage.get('token-pct').then((value) => {
				Api.token = value;
				if(value){
					this.nav.setRoot(SideMenuComponent);
				}else{
					this.nav.setRoot(LoginComponent);
				}
			});
		});
	}

}
