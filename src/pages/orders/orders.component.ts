//declare var require: any
import { Component } from '@angular/core';
//import { NavController, AlertController } from 'ionic-angular';
//import { OrderService } from '../../services/orders/orders.service';
//import { Order } from "../../models/order";
//import { UserService } from '../../services/user/user.service';
//import { LoginComponent } from '../login/login.component';
import { OrdersToDeliverComponent } from './orders-to-deliver.component';
import { OrdersDeliveredComponent } from './orders-delivered.component';
import { OrdersUndeliveredComponent } from './orders-undelivered.component';

@Component({
	selector: 'orders-tabs',
	templateUrl: 'order-tabs.html'
})
export class OrdersTabs {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	toDeliver = OrdersToDeliverComponent;
	delivered = OrdersDeliveredComponent;
	undelivered = OrdersUndeliveredComponent;

	constructor() {}
}