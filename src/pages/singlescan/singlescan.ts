import { AccountService } from './../../services/account.service';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'single-scan',
  templateUrl: 'singlescan.html'
})
export class SingleScanPage implements OnInit {
  statuses: any[];
  //  = [{ code: 1, val: "Status1",picture:false,signature:true }, { code: 2, val: "Status2",picture:true,signature:false }, { code: 3, val: "Status3",picture:false,signature:false }];
  scannedShipping: any;
  scannedShippingKeys: string[] = [];
  selectedStatus = {};
  imgUri;
  signature;
  isDrawing = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  private options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    targetWidth: 300,
    targetHeight: 300
  }

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
    this.scannedShipping = { country: "IL", vatnumber: 513191668, doctype: 1, docnumber: "4132", carrierVat: "123" };
    this.scannedShippingKeys = Object.keys(this.scannedShipping);
  }

  scanShipping() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.scannedShipping = JSON.parse(barcodeData.text);
      //this.scannedShipping = { country: "IL", vatnumber: 513191668, doctype: 1, docnumber: "4132" };
      this.scannedShippingKeys = Object.keys(this.scannedShipping);
    }, (err) => {
      this.toast("An error has occurred, try again.");
    });
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.imgUri = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      this.toast(err);
    });
  }

  ionViewDidEnter() {
    this.signaturePad.clear()
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    debugger;
    this.signaturePad.clear();
  }

  clearPad() {
    this.signaturePad.clear();
  }

  updateStatus() {
    this.scannedShipping.statusCode = this.selectedStatus['statusCode'];
    this.scannedShipping.statusName = this.selectedStatus['statusName'];
    if (this.selectedStatus['needsPortrait']) {
      this.scannedShipping.portraitImg = this.imgUri;
    }
    if (this.selectedStatus['needsSignature']) {
      this.scannedShipping.singatureImg = this.signature;
    }
    this.scannedShipping.isCanceled = 0;
    this.scannedShipping.updatedId = 0;
    this.scannedShipping.companyId = 0;
    //alert(`img uri : ${this.imgUri}`);
    //alert(`sig uri : ${this.signature}`);
    this.dashboard.updateStatus(this.scannedShipping).subscribe(res => {
      this.toast(res)
    });
  }

  toast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).present();
  }
}
