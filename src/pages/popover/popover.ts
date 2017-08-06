import { TabsPage } from './../tabs/tabs';
import { User } from './../../models/user';
import { AccountService } from './../../services/account.service';
import { App, ViewController, NavParams, Events, ToastController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'popover',
    templateUrl: 'popover.html'
})

export class PopoverPage implements OnInit {

    tempUser: User;
    verification: number;
    // static get parameters() {
    //     return [[ViewController], [null], [NavParams], [Events]];
    // }

    constructor(
        public appCtrl: App
        , public viewCtrl: ViewController
        , private account: AccountService
        , private params: NavParams
        , private toastCtrl: ToastController
    ) {

    }

    ngOnInit() {
        this.tempUser = this.params.data;
        this.account.getVerificationCode(this.tempUser).subscribe(res => {
            if (res.VerifyCode) {
                this.verification = res.VerifyCode;
            }
        });
    }

    verifiyUser(code) {
        if (code == this.verification) {
            this.account.createUser(this.tempUser).subscribe(res => {
                if (res == 1) {
                    this.viewCtrl.dismiss();
                    this.appCtrl.getRootNav().setRoot(TabsPage);
                    this.appCtrl.getRootNav().popAll();
                    this.appCtrl.getRootNav().push(TabsPage);
                } else {
                    this.toastCtrl.create({
                        message: "Error while creating user",
                        duration: 2000,
                        position: 'bottom'
                    }).present();
                }
            });
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }
}