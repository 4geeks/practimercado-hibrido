import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user/user.service';
import { OrderService } from '../../services/orders/orders.service';
import { Order } from "../../models/order";
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'order-product',
	templateUrl: 'order-product.html',
	providers: [OrderService]
})
export class OrderProductComponent {
	selectedItem: any;
	order: Order;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
				private orderService: OrderService, public alertCtrl: AlertController,
				private userService: UserService) {
		// If we navigated to this page, we will have an item available as a nav param
		this.order = navParams.get('order');
		console.log(this.order);
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
