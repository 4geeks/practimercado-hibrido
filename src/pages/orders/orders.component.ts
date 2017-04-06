import { Component } from '@angular/core';
import { OrdersToDeliverComponent } from './orders-to-deliver.component';
import { OrdersDeliveredComponent } from './orders-delivered.component';
import { OrdersUndeliveredComponent } from './orders-undelivered.component';

@Component({
	selector: 'orders-tabs',
	templateUrl: 'order-tabs.html'
})
export class OrdersTabs {
	toDeliver = OrdersToDeliverComponent;
	delivered = OrdersDeliveredComponent;
	undelivered = OrdersUndeliveredComponent;

	constructor() {}
}