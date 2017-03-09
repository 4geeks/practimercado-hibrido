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
	password: string;
	date_add: string = '2017-03-09 00:00:00';
}