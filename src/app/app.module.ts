import { SingleScanPage } from './../pages/singlescan/singlescan';
import { SettingsPage } from './../pages/settings/settings';
import { AppVersion } from '@ionic-native/app-version';
import { AboutPage } from './../pages/about/about';
import { ShippingComponent } from './../pages/multiscan/shipping';
import { PopoverPage } from './../pages/popover/popover';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DashboardService } from './../services/dashboard.service';
import { ServerProxyService } from './../services/ServerProxy';
import { CreateAccountPage } from './../pages/create-account/create-account.component';
import { AccountService } from './../services/account.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController } from 'ionic-angular';
import { MyApp } from './app.component';

import { MultiScanPage } from '../pages/multiscan/multiscan';
import { ResendPage } from '../pages/resend/resend';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    MyApp,
    MultiScanPage,
    ResendPage,
    SingleScanPage,
    TabsPage,
    LoginPage,
    CreateAccountPage,
    PopoverPage,
    ShippingComponent,
    AboutPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MultiScanPage,
    ResendPage,
    SingleScanPage,
    TabsPage,
    LoginPage,
    CreateAccountPage,
    PopoverPage,
    AboutPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GooglePlus,
    AccountService,
    ServerProxyService,
    DashboardService,
    BarcodeScanner,
    Camera,
    AppVersion,
    ToastController
  ]
})
export class AppModule { }
