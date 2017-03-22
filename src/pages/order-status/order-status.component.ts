import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Order } from "../../models/order";
import { UserService } from '../../services/user/user.service';
import { OrderService } from '../../services/orders/orders.service';
import { OrdersComponent } from '../orders/orders.component';
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'page-order-status',
	templateUrl: 'order-status.html',
	providers: [UserService, OrderService]
})
export class OrderStatusComponent {
	order: Order;
	orderForm: FormGroup;
	submitted = false;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private orderService: OrderService, public alertCtrl: AlertController,
				private userService: UserService, public fb: FormBuilder) {
		this.order = navParams.get('order');
		this.orderForm = this.fb.group({
			'comment': ['', Validators.required]
		});
	}

	changeStatus(){
		/* Cambio el estatus de la orden y luego cambio el comentario */
		this.orderService.updateOrder(this.order.status.href, 5)
			.subscribe(
				(data) => {
					this.orderService.updateOrder(this.order.comments.href, this.orderForm.get('comment').value)
						.subscribe(
							(data) => {
								this.navCtrl.setRoot(OrdersComponent);
							},
							(error) => { this.handlerErrors(error) }
						);
				},
				(error) => { this.handlerErrors(error) }
			);
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
