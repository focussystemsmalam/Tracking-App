import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DashboardService } from './../../services/dashboard.service';
import { AccountService } from './../../services/account.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'multi-scan',
  templateUrl: 'multiscan.html'
})
export class MultiScanPage {

  statuses: any[];
  scannedShippings: any[] = [{ country: "IL", vatnumber: 513191668, doctype: 1, docnumber: "4132" }];
  selectedStatus = {};

  constructor(
    private dashboard: DashboardService
    , private account: AccountService
    , private barcodeScanner: BarcodeScanner
    , private camera: Camera
    , private toastCtrl: ToastController
  ) {

  }


  ngOnInit() {
    this.dashboard.getStatuses().subscribe(res => {
      this.statuses = res.results;
    })
  }

  scanShipping() {
    this.barcodeScanner.scan().then((barcodeData) => {
      let scannedShipping = JSON.parse(barcodeData.text);
      let res = this.scannedShippings.find(shipping => {
        return shipping.vatnumber == scannedShipping.vatnumber && shipping.country == scannedShipping.country;
      });
      if (!res) {
        this.scannedShippings.push(scannedShipping);
      } else {
        this.toastCtrl.create({
          message: "You already scanned that shippment",
          duration: 2000,
          position: 'bottom'
        }).present();
      }

    }, (err) => {
       this.toastCtrl.create({
          message: "An error has occured try again",
          duration: 2000,
          position: 'bottom'
        }).present();
    });
  }

  remove(shipping) {
    let index = this.scannedShippings.indexOf(shipping);
    if (index >= 0) {
      this.scannedShippings.splice(index, 1);
    }
  }


  updateStatus() {
    this.scannedShippings.forEach(scannedShipping => {
      scannedShipping.statusCode = this.selectedStatus['statusCode'];
      scannedShipping.statusName = this.selectedStatus['statusName'];
      scannedShipping.companyId = 0;
      this.dashboard.updateStatus(scannedShipping).subscribe(res => {
        this.toastCtrl.create({
          message: res,
          duration: 2000,
          position: 'bottom'
        }).present();
      });
    })

  }

}
