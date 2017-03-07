import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "../../models/user/user";
import { Api } from "../api";

@Injectable()
export class UserService {
	constructor(private http: Http) {}

	login(user: User) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		return this.http.post(
			Api.apiUrl + "api/users/login/",
			JSON.stringify({
				username: user.email,
				password: user.password,
			}),
			{ headers: headers }
			)
		.map(response => response.json())
		.do(data => {
			Api.token = data.token;
			console.log(Api.token);
		})
		.catch(this.handleErrors);
	}

	handleErrors(error: Response) {
		console.log(error.json());
		return Observable.throw(error.json());
	}
}