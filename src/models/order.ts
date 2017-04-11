export class Shop{
	id: number;
	name: string;
	address: string;
	coord_lat: number;
	coord_lon: number;
	href: string;
	is_enabled: boolean;
}

export class Product{
	id: number;
	is_enabled: boolean;
	name: string;
	href: string;
}

export class Status{
	id: number;
	value: number;
	href: string;
}

export class Customer{
	email: string;
	phone_number: string;
	username: string;
}

export class Comment{
	id: number;
	value: string;
	href: string;
}

export class Order {
	id: number;
	assigned_shop: Shop;
	customer: Customer;
	products: Array<Product>;
	status: Status;
	address: string;
	coord_lat: number;
	coord_lon: number;
	courier: string;
	href: string;
	comments: Comment;
	date_add: string = '2017-03-09 00:00:00';
	shipped_at: string;
	delivered_at: string;
	price_subtotal: number;
	price_total: number;
}

export class Reject{
	id: number = 0;
	msg: string = '';
}