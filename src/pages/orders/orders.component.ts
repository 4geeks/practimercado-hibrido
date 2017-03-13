import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderService } from '../../services/orders/orders.service';
import { Order } from "../../models/order";
import { OrderDetailComponent } from "../order_detail/order_detail.component";


@Component({
	selector: 'page-orders',
	templateUrl: 'orders.html',
	providers: [OrderService],
})
export class OrdersComponent {
	orders: Array<Order>;

	constructor(public navCtrl: NavController, private orderService: OrderService) {
		this.orderService.getOrders()
			.subscribe(
				(data) => {
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
		this.navCtrl.push(OrderDetailComponent, {
			order: item
		});
	}

	status_text(obj){
		let text = "";
		switch (obj.status.value) {
			case 1:
				text = "Por aprobar";
				break;
			case 2:
				text = "Preparado";
				break;
			case 3:
				text = "Por entregar";
				break;
			case 4:
				text = "Entregado"
				break;
			case 5:
				text = "Rechazado"
				break;
			default:
				break;
		}

		return text;
	}

	doInfinite(infiniteScroll){
		console.log("esta pasando algo!");
		infiniteScroll.complete();
	}
}
