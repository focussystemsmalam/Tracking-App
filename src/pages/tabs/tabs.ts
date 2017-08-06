import { SingleScanPage } from './../singlescan/singlescan';
import { SettingsPage } from './../settings/settings';
import { AccountService } from './../../services/account.service';
import { AboutPage } from './../about/about';
import { Component } from '@angular/core';

import { MultiScanPage } from '../multiscan/multiscan';
import { ResendPage } from '../resend/resend';

import { MenuController, PopoverController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SingleScanPage;
  tab2Root = MultiScanPage;
  tab3Root = ResendPage;

  constructor(
    public menuCtrl: MenuController
    , private popover: PopoverController
    , private account: AccountService
  ) {

  }

  openMenu() {
    this.menuCtrl.open()
  }

  aboutPage() {
    let about = this.popover.create(AboutPage);
    about.present();
  }

  settingsPage(){
    let settings = this.popover.create(SettingsPage);
    settings.present();
  }
}
