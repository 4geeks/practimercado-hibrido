import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user/user.service';
import { Page2 } from '../page2/page2';
import { OrdersComponent } from '../orders/orders.component';
import { LoginComponent } from '../login/login.component';

@Component({
  templateUrl: 'sidemenu.html',
  providers: [UserService]
})
export class SideMenuComponent {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = OrdersComponent;
	pages: Array<{title: string, component: any, icon: string}>;
	
	constructor(public platform: Platform, private userService: UserService, public alertCtrl: AlertController) {
		this.initializeApp();
		this.pages = [
			{ title: 'Ordenes', component: OrdersComponent, icon: 'ios-list-box-outline' },
			{ title: 'Perfil', component: Page2, icon: 'ios-contact-outline' }
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {});
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
