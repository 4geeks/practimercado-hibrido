import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Api } from "../services/api";
import { LoginComponent } from '../pages/login/login.component';
import { SideMenuComponent } from '../pages/sidemenu/sidemenu.component';

@Component({
	templateUrl: 'app.html',
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;

	constructor(public platform: Platform, public storage: Storage) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
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
