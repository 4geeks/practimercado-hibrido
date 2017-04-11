import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Order, Reject } from "../../models/order";
import { UserService } from '../../services/user/user.service';
import { OrderService } from '../../services/orders/orders.service';
import { OrdersTabs } from '../orders/orders.component';
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'page-order-status',
	templateUrl: 'order-status.html',
	providers: [UserService, OrderService, Reject]
})
export class OrderStatusComponent {
	order: Order;
	rejectstatus: Array<Reject>;
	orderForm: FormGroup;
	submitted = false;

	/**
	* Constructor
	* @param navCtrl 		controlador de navegación.
	* @param navParams 		controlador de los parametros de navegación.
	* @param orderService	Servicios para el modelo orden.
	* @param alertCtrl 		Alert para advertencias.
	* @param userService 	Servicios para el modelo usuario.
	* @param fb 			Formulario de angular.
	* @returns       		Nada.
	*/
	constructor(public navCtrl: NavController, public navParams: NavParams,
				private orderService: OrderService, public alertCtrl: AlertController,
				private userService: UserService, public fb: FormBuilder, public currReject: Reject) {
		this.order = navParams.get('order');
		this.orderForm = this.fb.group({
			'rejectOrder': ['', Validators.required]
		});
	}

	/**
	* Para validar al entrar en la vista. Llama a la carga de los estatus de rechazo.
	* @returns       		Nada.
	*/
	ionViewCanEnter(){
		this.loadRejectStatus();
	}

	/**
	* Actualiza el estatus de rechazo en el formulario y el objeto que actualizará el servicio.
	* @returns       		Nada.
	*/
	setRejectStatus(value){
		this.orderForm.controls['rejectOrder'].setValue(value.id);
		this.currReject = value;
	}

	/**
	* Carga los estatus de rechazo de la orden.
	* @returns       		Nada.
	*/
	loadRejectStatus(){
		this.orderService.getRejectOptions()
			.subscribe(
				(data) => {
					console.log(data.json().status.rejected);
					this.rejectstatus = data.json().status.rejected as Reject[];
					console.log(this.rejectstatus);
				},
				(error) => { this.handlerErrors(error) }
			);
	}

	/**
	* Llama al servicio que actualiza el estatus de la orden y el comentario.
	* @returns       		Nada.
	*/
	changeStatus(){
		/* Cambio el estatus de la orden y luego cambio el comentario */
		this.orderService.updateOrder(this.order.status.href, 5)
			.subscribe(
				(data) => {
					this.orderService.updateOrder(this.order.comments.href, this.currReject.msg)
						.subscribe(
							(data) => {
								this.navCtrl.setRoot(OrdersTabs);
							},
							(error) => { this.handlerErrors(error) }
						);
				},
				(error) => { this.handlerErrors(error) }
			);
	}

	/**
	* Método para manejar los errores de la suscripción a un servicio.
	* @returns       		Nada.
	*/
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
