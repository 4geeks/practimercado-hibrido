import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user/user.service';

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
	providers: [UserService],
})
export class ProfileComponent {
	passwordForm: FormGroup;
	submitted = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
				public fb: FormBuilder, private userService: UserService,
				public alertCtrl: AlertController) {
		this.passwordForm = this.fb.group({
			'curr_password': ['', Validators.required],
			'new_password': ['', Validators.required],
			'repeat_password': ['', Validators.required],
		}, {
			validator: this.matchingPasswords('new_password', 'repeat_password')
		});
	}

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
