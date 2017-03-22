import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from "../../models/order";
//import { UserService } from '../../services/user/user.service';
//import { OrderService } from '../../services/orders/orders.service';
//import { OrdersComponent } from '../orders/orders.component';
//import { LoginComponent } from '../login/login.component';

declare var google;

@Component({
	selector: 'page-order-map',
	templateUrl: 'order-map.html'
})
export class OrderMapComponent {
	order: Order;
	@ViewChild('map') mapElement: ElementRef;
	map: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.order = navParams.get('order');
	}

	ionViewDidLoad(){
		this.loadMap();
	}

	loadMap(){
		let latLng = new google.maps.LatLng(this.order.coord_lat, this.order.coord_lon);

		let mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

		let markerIcon = './assets/pin.png';

		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: this.map.getCenter(),
			icon: markerIcon
		});

		let content = this.order.address;
		this.addInfoWindow(marker, content);
	}

	addInfoWindow(marker, content){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

	}
}
