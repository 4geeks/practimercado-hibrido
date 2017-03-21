import { Storage } from '@ionic/storage';
import { Injectable, Inject } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

//import { Order } from "../../models/order";
import { Api } from "../api";

@Injectable()
export class OrderService {
	
	constructor(private http: Http, public storage: Storage, @Inject(EnvVariables) public env) {}

	getOrders(url = null) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		if(Api.token){
			headers.append("Authorization", "JWT " + Api.token);
			return this.http.get(
				url ? url : this.env.apiUrl + "api/delivering/",
				{ headers: headers }
				)
			.map(response => {
				return response;
			})
			.catch(this.handleErrors);
		}else{
			return Observable.throw({ detail: 'Sin autorización', code: 401 });
		}
	}

	updateStatusOrder(url, status){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		if(Api.token){
			headers.append("Authorization", "JWT " + Api.token);
			return this.http.put(
				url,
				JSON.stringify({
					value: status
				}),
				{ headers: headers }
				)
			.map(response => {
				return response;
			})
			.catch(this.handleErrors);
		}else{
			return Observable.throw({ detail: 'Sin autorización', code: 401 });
		}
	}

	handleErrors(error: Response) {
		return Observable.throw(error.json());
	}
}