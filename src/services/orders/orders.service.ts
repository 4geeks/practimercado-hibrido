import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Api } from "../api";

@Injectable()
export class OrderService {
	
	constructor(private http: Http, public storage: Storage) {}

	getOrders(url = null, status = null) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		if(Api.token){
			let url_status = status != null ? "?status=" + status: '';
			headers.append("Authorization", "JWT " + Api.token);
			return this.http.get(
				url ? url : Api.apiUrl + "api/delivering/" + url_status,
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

	updateOrder(url, status){
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

	getRejectOptions() {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		if(Api.token){
			headers.append("Authorization", "JWT " + Api.token);
			return this.http.options(
				Api.apiUrl + "api/orders/",
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