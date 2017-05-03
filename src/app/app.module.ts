import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { SideMenuComponent } from '../pages/sidemenu/sidemenu.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { OrdersTabs } from '../pages/orders/orders.component';
import { OrdersToDeliverComponent } from '../pages/orders/orders-to-deliver.component';
import { OrdersDeliveredComponent } from '../pages/orders/orders-delivered.component';
import { OrdersUndeliveredComponent } from '../pages/orders/orders-undelivered.component';
import { LoginComponent } from '../pages/login/login.component';
import { OrderDetailComponent } from '../pages/order-detail/order-detail.component';
import { OrderStatusComponent } from '../pages/order-status/order-status.component';
import { OrderMapComponent } from '../pages/order-map/order-map.component';
import { OrderProductComponent } from '../pages/order-product/order-product.component';
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
    OrdersTabs,
    OrdersToDeliverComponent,
    OrdersDeliveredComponent,
    OrdersUndeliveredComponent,
    OrderDetailComponent,
    OrderStatusComponent,
    OrderMapComponent,
    OrderProductComponent
  ],
  exports: [
    OrderByPipe,
    FilterPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: false }),
    IonicStorageModule.forRoot(),
    EnvironmentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginComponent,
    MyApp,
    SideMenuComponent,
    ProfileComponent,
    OrdersTabs,
    OrdersToDeliverComponent,
    OrdersDeliveredComponent,
    OrdersUndeliveredComponent,
    OrderDetailComponent,
    OrderStatusComponent,
    OrderMapComponent,
    OrderProductComponent
  ],
  providers: [SplashScreen, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
