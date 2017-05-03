import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Nav, NavController, AlertController, Platform } from 'ionic-angular';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { SideMenuComponent } from '../../pages/sidemenu/sidemenu.component';


@Component({
	selector: "login-screen",
	providers: [UserService],
	templateUrl: "login.html"
})
export class LoginComponent {
	isLoggingIn = true;
	user: User;
	submitted = false;
	loginForm: FormGroup;

	@ViewChild(Nav) nav: Nav;

	/**
	* Constructor inicializa el formulario de login
	* @param fb 			formulario basado en formbuilder.
	* @param navCtrl 		controlador de navegación.
	* @param userService 	Servicios para el modelo usuario.
	* @param alertCtrl 		Alert para advertencias.
	* @returns       		Nada.
	*/
	constructor(public platform: Platform, public fb: FormBuilder, private navCtrl: NavController, 
				private userService: UserService, public alertCtrl: AlertController) {
		this.user = new User();
		this.loginForm = this.fb.group({
			'username': ['', Validators.required],
			'password': ['', Validators.required],
		});
	}

	/**
	* Funcion para validar el formulario
	* @returns       		Void.
	*/
	submit(){
		
		if (this.loginForm.get('username').hasError('required')) {
			let alert = this.alertCtrl.create({
				title: 'Login',
				subTitle: 'Debes ingresar un usuario',
				buttons: ['OK']
			});
			alert.present();
			return;
		}

		if (this.loginForm.get('password').hasError('required')) {
			let alert = this.alertCtrl.create({
				title: 'Login',
				subTitle: 'Password requerido',
				buttons: ['OK']
			});
			alert.present();
			return;
		}

		this.submitted = true;

		this.user.username = this.loginForm.get('username').value;
		this.user.password = this.loginForm.get('password').value;

		this.login();
	}

	/**
	* Método para logear al usuario en el server, una vez aprobado por el server
	* el token de sesión es almacenado en localstorage para posteriores consultas
	* @returns       		Void.
	*/
	login() {
		this.userService.login(this.user)
			.subscribe(
				() => {
					this.navCtrl.setRoot(SideMenuComponent)
				},
				(error) => {
					this.submitted = false;
					let errors = '';
					if('non_field_errors' in error){
						for(let data of error.non_field_errors) {
							errors += data + '<br>';
						}
						let alert = this.alertCtrl.create({
							title: 'Login',
							subTitle: errors,
							buttons: ['OK']
						});
						alert.present();
					}
				}
			);
	}
}
