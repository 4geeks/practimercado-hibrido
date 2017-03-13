import { Component } from '@angular/core';
//import { OrderService } from '../../services/orders/orders.service';
import { Order } from "../../models/order";
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'order-detail',
	templateUrl: 'order_detail.html'
})
export class OrderDetailComponent {
	selectedItem: any;
	order: Order;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		// If we navigated to this page, we will have an item available as a nav param
		this.order = navParams.get('order');
		console.log(this.order);
	}

	itemTapped(event, item) {
		// That's right, we're pushing to ourselves!
		/*this.navCtrl.push(Page2, {
			item: item
		});*/
	}
}
