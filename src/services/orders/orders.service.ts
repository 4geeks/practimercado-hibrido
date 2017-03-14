import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

//import { Order } from "../../models/order";
import { Api } from "../api";

@Injectable()
export class OrderService {
	
	constructor(private http: Http, public storage: Storage) {}

	getOrders(url = null) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		console.log(Api.token);
		if(Api.token){
			headers.append("Authorization", "JWT " + Api.token);
			return this.http.get(
				url ? url : Api.apiUrl + "api/delivering/",
				{ headers: headers }
				)
			.map(response => {
				console.log(response.headers.get('Link'));
				return response;
			})
			.catch(this.handleErrors);
		}else{
			//display error alert o intente el login
		}
	}

	handleErrors(error: Response) {
		return Observable.throw(error.json());
	}

	logout(){
		this.storage.remove('token-pct').then(() => {
			Api.token = '';
		});
		return true;
	}
}