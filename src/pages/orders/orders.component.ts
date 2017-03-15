//declare var require: any
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { OrderService } from '../../services/orders/orders.service';
import { Order } from "../../models/order";
import { UserService } from '../../services/user/user.service';
import { OrderDetailComponent } from "../order-detail/order-detail.component";
import { LoginComponent } from '../login/login.component';
var parse = require("parse-link-header");

@Component({
	selector: 'page-orders',
	templateUrl: 'orders.html',
	providers: [OrderService],
})
export class OrdersComponent {
	orders: Array<Order>;
	next: string = null;
	prev: string = null;

	constructor(public navCtrl: NavController, private orderService: OrderService, 
				public alertCtrl: AlertController, private userService: UserService) {
		this.orderService.getOrders()
			.subscribe(
				(data) => {
					this.orders = data.json() as Order[];
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
		if(this.next){
			this.orderService.getOrders(this.next)
			.subscribe(
				(data) => {
					let orders_scroll = data.json() as Order[];
					this.orders = this.orders.concat(orders_scroll);
					if(data.headers.get('Link')){
						let links = parse(data.headers.get('Link'));
						if(links.next)
							this.next = links.next.url;
						else
							this.next = null;
						if(links.prev)
							this.prev = links.prev.url;
						else
							this.prev = null;
					}
					infiniteScroll.complete();
				},
				(error) => {
					infiniteScroll.complete();
					this.handlerErrors(error);
				}
			);
		}else{
			infiniteScroll.complete();
		}
	}

	handlerErrors(error){
		console.log(error);
		if('detail' in error){
			let alert = this.alertCtrl.create({
				title: 'Ordenes',
				subTitle: error.detail,
				buttons: [
					{
						text: 'OK',
						handler: () => {
							this.userService.logout();
							this.navCtrl.setRoot(LoginComponent);
						}
					}
				]
			});
			alert.present();
		}
		if('currentTarget' in error && error.currentTarget.status==0){
			let alert = this.alertCtrl.create({
				title: 'Ordenes',
				subTitle: 'No hay conexión a internet.',
				buttons: ['OK']
			});
			alert.present();
		}
	}

	
}
