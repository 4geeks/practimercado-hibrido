import { NgModule } from '@angular/core';
import { EnvVariables } from './environment-variables.token';
import { devVariables } from './development';
import { prodVariables } from './production';

export let envmt = 'dev'; // Typescript compiler will complain without this

@NgModule({
	providers: [
	{
		provide: EnvVariables,
		useValue: envmt === 'dev' ? devVariables : prodVariables
	}
	]
})
export class EnvironmentsModule {}