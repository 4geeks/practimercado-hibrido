import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user/user.service';
import { Profile } from "../../models/user";

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
	providers: [UserService, Profile],
})
export class ProfileComponent {
	passwordForm: FormGroup;
	submitted = false;

	/**
	* Constructor: carga el perfil, inicializa el formulario de cambio de password
	* @param navParams		para consultar los datos get
	* @param navCtrl 		controlador de navegación.
	* @param fb				formulario basado en formbuilder.
	* @param userService 	Servicios para el modelo usuario.
	* @param alertCtrl 		Alert para advertencias.
	* @param profile 		Provider para el perfil del usuario.
	* @returns       		Void.
	*/
	constructor(public navCtrl: NavController, public navParams: NavParams, 
				public fb: FormBuilder, private userService: UserService,
				public alertCtrl: AlertController, public profile: Profile) {
		this.loadProfile();
		this.passwordForm = this.fb.group({
			'curr_password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
			'new_password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
			'repeat_password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
		}, {
			validator: this.matchingPasswords('new_password', 'repeat_password')
		});
	}

	/**
	* Se subscribe al servicio para capturar los datos del perfil del usuario
	* desde el server
	* @returns       		Void.
	*/
	loadProfile(){
		this.userService
			.profile()
			.subscribe(
				(data) => {
					this.profile = data.json() as Profile;
				},
				(error) => {
					let alert = this.alertCtrl.create({
						title: 'Perfil',
						subTitle: 'Imposible recuperar datos del perfil',
						buttons: ['OK']
					});
					alert.present();
				}
			);
	}

	/**
	* Método para validar que los password nuevos coinciden
	* @param passwordKey			String que contiene el password nuevo
	* @param confirmPasswordKey 	String que contiene el password nuevo para revalidar
	* @returns       		Boolean que describe si los passwords son iguales.
	*/
	matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
		return (group: FormGroup): {[key: string]: any} => {
			let password = group.controls[passwordKey];
			let confirmPassword = group.controls[confirmPasswordKey];

			if (password.value !== confirmPassword.value) {
				return {
					mismatchedPasswords: true
				};
			}
		}
	}

	/**
	* Método para actualizar el password de un usuario en el servidor.
	* @returns       		Boolean que describe si los passwords son iguales.
	*/
	submit(){
		this.submitted = true;

		this.userService
			.changePassword(this.passwordForm.get('curr_password').value, 
							this.passwordForm.get('new_password').value)
			.subscribe(
				(data) => {
					this.passwordForm.reset();
					let alert = this.alertCtrl.create({
						title: '',
						subTitle: '<span class="alert-icon icon icon-md ion-md-checkmark-circle-outline"></span><br>Cambio exitoso de contraseña',
						buttons: ['OK'],
						cssClass: 'profile-alert'
					});
					alert.present();
				},
				(error) => {
					this.submitted = false;
					let errors = '';
					if('current_password' in error){
						for(let data of error.current_password) {
							errors += data + '<br>';
						}
						let alert = this.alertCtrl.create({
							title: 'Perfil',
							subTitle: errors,
							buttons: ['OK']
						});
						alert.present();
					}
				}
			);
	}
}
