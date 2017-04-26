import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { OrderService } from '../../services/orders/orders.service';
import { Order } from "../../models/order";
import { UserService } from '../../services/user/user.service';
import { OrdersToDeliverComponent } from './orders-to-deliver.component';

var parse = require("parse-link-header");

@Component({
	selector: 'page-delivered',
	templateUrl: 'orders.html',
	providers: [OrderService]
})
export class OrdersDeliveredComponent extends OrdersToDeliverComponent{

	constructor(public navCtrl: NavController, public orderService: OrderService, 
				public alertCtrl: AlertController, public userService: UserService) {
		super(navCtrl, orderService, alertCtrl, userService);
		
	}

	ionViewDidEnter(){
		this.loadOrders();
	}

	loadOrders(){
		this.orderService.getOrders(null, 4)
			.subscribe(
				(data) => {
					this.orders = data.json() as Order[];
					
					this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
						this.searching = false;
						this.setFilteredItems();
					});

					if(data.headers.get('Link')){
						let links = parse(data.headers.get('Link'));
						if(links.next)
							this.next = links.next.url;
						if(links.prev)
							this.prev = links.prev.url;
					}
				},
				(error) => { this.handlerErrors(error) }
			);
	}
}
