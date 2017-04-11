import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { UserService } from '../../services/user/user.service';
import { ProfileComponent } from '../profile/profile.component';
import { OrdersTabs } from '../orders/orders.component';
import { LoginComponent } from '../login/login.component';

@Component({
  templateUrl: 'sidemenu.html',
  providers: [UserService]
})
export class SideMenuComponent {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = OrdersTabs;
	pages: Array<{title: string, component: any, icon: string}>;
	
	constructor(public platform: Platform, private userService: UserService, public alertCtrl: AlertController) {
		this.initializeApp();
		this.pages = [
			{ title: 'Ordenes', component: OrdersTabs, icon: 'ios-list-box-outline' },
			{ title: 'Perfil', component: ProfileComponent, icon: 'ios-contact-outline' }
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			Splashscreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}

	logout(){
		if(this.userService.logout()){
			this.nav.setRoot(LoginComponent);
		}else{
			let alert = this.alertCtrl.create({
				title: 'Logout',
				subTitle: 'Problemas cerrando sesión',
				buttons: ['OK']
			});
			alert.present();
		}
	}
}
