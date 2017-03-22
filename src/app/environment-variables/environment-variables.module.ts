import { NgModule } from '@angular/core';
import { EnvVariables } from './environment-variables.token';
import { devVariables } from './development';
import { prodVariables } from './production';

//declare const ENV; // Typescript compiler will complain without this

@NgModule({
	providers: [
	{
		provide: EnvVariables,
		useValue: ENV.environment === 'dev' ? devVariables : prodVariables
	}
	]
})
export class EnvironmentsModule {}