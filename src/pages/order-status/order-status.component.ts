import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from "../../models/order";

/*
Generated class for the OrderStatus page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
	selector: 'page-order-status',
	templateUrl: 'order-status.html'
})
export class OrderStatusComponent {
	order: Order;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.order = navParams.get('order');
	}
}
