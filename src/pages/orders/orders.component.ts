import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../services/orders/orders.service';
import { Order } from "../../models/order";

@Component({
	selector: 'page-orders',
	templateUrl: 'orders.html',
	providers: [OrderService],
})
export class OrdersComponent {
	selectedItem: any;
	icons: string[];
	items: Array<{title: string, note: string, icon: string}>;
	orders: Array<Order>;

	constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderService) {
		this.orderService.getOrders()
			.subscribe(
				(data) => {
					console.log(data);
					this.orders = data;
					console.log(this.orders);
				},
				(error) => {
					console.log(error);
				}
			);
	}

	itemTapped(event, item) {
		// That's right, we're pushing to ourselves!
		this.navCtrl.push(OrdersComponent, {
			item: item
		});
	}
}
