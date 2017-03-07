import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Page2 } from '../page2/page2';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  templateUrl: 'sidemenu.html'
})
export class SideMenuComponent {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = Page2;
	pages: Array<{title: string, component: any}>;
	
	constructor(public platform: Platform) {
		this.initializeApp();
		this.pages = [
			{ title: 'Ordenes', component: OrdersComponent },
			{ title: 'Perfil', component: Page2 }
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
}
