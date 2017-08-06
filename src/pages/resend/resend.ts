import { DashboardService } from './../../services/dashboard.service';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'resend',
  templateUrl: 'resend.html'
})
export class ResendPage {

  resends = JSON.parse(localStorage.getItem("resend")) || [];

  constructor(public navCtrl: NavController
    , private dashboard: DashboardService
    , private toastCtrl: ToastController) {

  }

  refresh(refresher) {
    this.resends = JSON.parse(localStorage.getItem("resend")) || [];
    refresher.complete();
  }

  updateStatus() {
    if (this.resends.length > 0) {
      for (let scannedShipping of this.resends) {
        scannedShipping.companyId = 0;
        this.dashboard.updateStatus(scannedShipping).subscribe(res => {
          this.toastCtrl.create({
            message: res,
            duration: 2000,
            position: 'bottom'
          }).present();
        });
      }
    }
  }



}
