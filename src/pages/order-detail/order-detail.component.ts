import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user/user.service';
import { OrderService } from '../../services/orders/orders.service';
import { Order } from "../../models/order";
import { OrderStatusComponent } from '../order-status/order-status.component';
import { LoginComponent } from '../login/login.component';
import { OrdersTabs } from '../orders/orders.component';
import { OrderMapComponent } from '../order-map/order-map.component';

@Component({
	selector: 'order-detail',
	templateUrl: 'order-detail.html',
	providers: [OrderService]
})
export class OrderDetailComponent {
	selectedItem: any;
	order: Order;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
				private orderService: OrderService, public alertCtrl: AlertController,
				private userService: UserService) {
		// If we navigated to this page, we will have an item available as a nav param
		this.order = navParams.get('order');
		console.log(this.order);
	}

	changeStatus(status){
		/* Cambio de estatus*/
		this.orderService.updateOrder(this.order.status.href, status)
			.subscribe(
				(data) => {
					this.navCtrl.setRoot(OrdersTabs);
				},
				(error) => { this.handlerErrors(error) }
			);
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
				text = "Despachando";
				break;
			case 4:
				text = "Entregado";
				break;
			case 5:
				text = "Rechazado";
				break;
			case 6:
				text = "Por entregar";
				break;
			default:
				break;
		}

		return text;
	}

	rejectOrder(){
		this.navCtrl.push(OrderStatusComponent, { order: this.order } );
	}

	viewMap(){
		this.navCtrl.push(OrderMapComponent, { order: this.order } );
	}

	handlerErrors(error){
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
		else if('currentTarget' in error && error.currentTarget.status==0){
			let alert = this.alertCtrl.create({
				title: 'Ordenes',
				subTitle: 'No hay conexión a internet.',
				buttons: ['OK']
			});
			alert.present();
		}
	}
}
