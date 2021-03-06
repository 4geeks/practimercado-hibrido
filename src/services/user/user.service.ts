import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { User } from "../../models/user";
import { Api } from "../api";

@Injectable()
export class UserService {
	
	constructor(private http: Http, public storage: Storage) {}

	login(user: User) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		return this.http.post(
			Api.apiUrl + "auth/login/",
			JSON.stringify({
				username: user.username,
				password: user.password,
			}),
			{ headers: headers }
			)
		.map(response => response.json())
		.do(data => {
			Api.token = data.token;
			this.storage.set('token-pct', data.token);
		})
		.catch(this.handleErrors);
	}

	changePassword(curr_password: string, new_password:string){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		if(Api.token){
			headers.append("Authorization", "JWT " + Api.token);
			return this.http.put(
				Api.apiUrl + "auth/password/",
				JSON.stringify({
					current_password: curr_password,
					new_password: new_password,
				}),
				{ headers: headers })
			.map(response => { return response })
			.catch(this.handleErrors);
		}else{
			return Observable.throw({ detail: 'Sin autorización', code: 401 });
		}
	}

	profile(){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		if(Api.token){
			headers.append("Authorization", "JWT " + Api.token);
			return this.http.get(
				Api.apiUrl + "auth/me/",
				{ headers: headers }
				)
			.map(response => { return response; })
			.catch(this.handleErrors);
		}else{
			return Observable.throw({ detail: 'Sin autorización', code: 401 });
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