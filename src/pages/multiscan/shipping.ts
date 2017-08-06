import { Camera, CameraOptions } from '@ionic-native/camera';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'shipping',
    templateUrl: 'shipping.html'
})

export class ShippingComponent implements OnInit {

    @Input() shipping: any;
    @Input("status") selectedStatus: any = {};

    isDrawing = false;

    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
        'minWidth': 1,
        'canvasWidth': 300,
        'canvasHeight': 100,
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

    constructor(private camera: Camera) { }

    ngOnInit() {
        this.shipping.updatedId = 0;
     }

    takePicture() {
        this.camera.getPicture(this.options).then((imageData) => {
            this.shipping.imgUri = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
            alert(JSON.stringify(err));
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
        this.shipping.signature = this.signaturePad.toDataURL();
        this.signaturePad.clear();
    }

    clearPad() {
        this.signaturePad.clear();
    }
}