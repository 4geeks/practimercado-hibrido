import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { SideMenuComponent } from '../pages/sidemenu/sidemenu.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { OrdersComponent } from '../pages/orders/orders.component';
import { LoginComponent } from '../pages/login/login.component';
import { OrderDetailComponent } from '../pages/order-detail/order-detail.component';
import { OrderStatusComponent } from '../pages/order-status/order-status.component';
import { OrderMapComponent } from '../pages/order-map/order-map.component';
import { EnvironmentsModule } from './environment-variables/environment-variables.module';
import { OrderByPipe } from '../pipes/orderBy';
import { FilterPipe } from '../pipes/filter';

@NgModule({
  declarations: [
    OrderByPipe,
    FilterPipe,
    LoginComponent,
    MyApp,
    SideMenuComponent,
    ProfileComponent,
    OrdersComponent,
    OrderDetailComponent,
    OrderStatusComponent,
    OrderMapComponent
  ],
  exports: [
    OrderByPipe,
    FilterPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    EnvironmentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginComponent,
    MyApp,
    SideMenuComponent,
    ProfileComponent,
    OrdersComponent,
    OrderDetailComponent,
    OrderStatusComponent,
    OrderMapComponent
  ],
  providers: [Storage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
