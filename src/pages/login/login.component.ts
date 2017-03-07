import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user/user.service';
import { MyApp } from '../../app/app.component';
import { Page1 } from '../../pages/page1/page1';


@Component({
	selector: "login-screen",
	providers: [UserService],
	templateUrl: "login.html"
})
export class LoginComponent {
	isLoggingIn = true;
	user: User;
	@ViewChild(Nav) nav: Nav;

	rootPage: any = MyApp;

	constructor(public platform: Platform, private navCtrl: NavController, private userService: UserService, public alertCtrl: AlertController) {
		this.user = new User();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
		});
	}

	submit(){
		console.log("Aja tengo data que enviar");
		if (!this.user.isValidEmail()) {
			let alert = this.alertCtrl.create({
				title: 'Login',
				subTitle: 'Email inválido',
				buttons: ['OK']
			});
			alert.present();
			return;
		}

		this.login();
	}

	login() {
		this.userService.login(this.user)
			.subscribe(
				() => {
					this.navCtrl.setRoot(Page1)
				},
				(error) => console.log(error)
			);
	}
}
