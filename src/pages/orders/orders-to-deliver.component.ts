import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { OrderService } from '../../services/orders/orders.service';
import { Order } from "../../models/order";
import { UserService } from '../../services/user/user.service';
import { OrderDetailComponent } from "../order-detail/order-detail.component";
import { LoginComponent } from '../login/login.component';
var parse = require("parse-link-header");

@Component({
	selector: 'page-todeliver',
	templateUrl: 'orders.html',
	providers: [OrderService]
})
export class OrdersToDeliverComponent {
	orders: Array<Order>;
	next: string = null;
	prev: string = null;

	/**
	* Constructor
	* @param navCtrl 		controlador de navegación.
	* @param orderService	Servicios para el modelo orden.
	* @param alertCtrl 		Alert para advertencias.
	* @param userService 	Servicios para el modelo usuario.
	* @returns       		Nada.
	*/
	constructor(public navCtrl: NavController, public orderService: OrderService, 
				public alertCtrl: AlertController, public userService: UserService) {
	}

	/**
	* Ionic método para reivsar la data antes de mostrarla en la vista
	* en este caso se invoca la carga de las ordenes.
	* @returns       		Nada.
	*/
	ionViewDidEnter(){
		this.loadOrders();
	}

	/**
	* Carga las ordenes desde el server.
	* @returns       		Nada.
	*/
	loadOrders(){
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

	/**
	* Método para capturar el clic en una orden y diriguir al detalle de
	* la orden
	* @param event 			Captura del clic.
	* @param item 			La data de la orden a mostrar.
	* @returns       		Nada.
	*/
	itemTapped(event, item) {
		this.navCtrl.push(OrderDetailComponent, {
			order: item
		});
	}

	/**
	* Método para filtrar las ordenes por el input search
	* @param event 			Captura el cambio en el search box.
	* @returns       		Nada.
	*/
	searchOrder(event: any){
		// set val to the value of the searchbar
		let val = event.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.orders = this.orders.filter((item) => {
				return (item.id == parseInt(val));
			})
		}else{
			this.loadOrders();
		}
	}

	/**
	* Método para listar el nombre del estado de una orden
	* @param obj 			La orden seleccionada para mostar el estatus.
	* @returns       		Nada.
	*/
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

	/**
	* Método para cargar mas ordenes al hacer scroll down
	* @param infiniteScroll		Evento del scroll.
	* @returns       		Nada.
	*/
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

	/**
	* Método para manejar el error producido por el server al subscribirce.
	* @param error			Observable con el error producido.
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
