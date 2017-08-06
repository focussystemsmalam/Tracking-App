import { PopoverPage } from './../popover/popover';
import { App, PopoverController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AccountService } from './../../services/account.service';
import { User } from './../../models/user';
import { Component, AfterViewInit, ViewChild } from '@angular/core';

const phoneRegex = /^((\+972|972)|0)( |-)?([1-468-9]( |-)?\d{7}|(5|7)[0-9]( |-)?\d{7})$/;
const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

@Component({
    selector: 'create-account',
    templateUrl: 'create-account.component.html'
})

export class CreateAccountPage implements AfterViewInit {
    @ViewChild("userForm") userForm;
    @ViewChild("idNumber") idNumber;
    @ViewChild("phoneNumber") phoneNumber;
    @ViewChild("email") email;

    tempUser: User = { userPID: '', firstName: '', lastName: '', userEmail: '', userPassword: '', countryCode: '', userTelephone: '' };
    showErrors: boolean = false;

    constructor(
        private googlePlus: GooglePlus
        , private account: AccountService
        , public appCtrl: App
        , public popoverCtrl: PopoverController
    ) { }

    ngAfterViewInit() {
        this.idNumber.ngControl.control.setValidators([this.isValidIsraeliID]);
        this.phoneNumber.ngControl.control.setValidators([this.isIsraeliPhone]);
        this.email.ngControl.control.setValidators([this.isEmail]);
    }



    getGoogleDetails() {
        this.googlePlus.login({
            'webClientId': '860126579328-dcea8032pjl2f5opmujsnj5cqqbutc5s.apps.googleusercontent.com',
            'offline': true
        }).then(res => {
            this.tempUser.firstName = res.givenName;
            this.tempUser.lastName = res.familyName;
            this.tempUser.userEmail = res.email;
            this.tempUser.userPassword = res.idToken;
        })
            .catch(err => alert("error" + JSON.stringify(err)));
    }



    createUser() {
        if (this.userForm.valid) {
            this.showErrors = false;
            let popover = this.popoverCtrl.create(PopoverPage, this.tempUser);
            popover.present();
        } else {
            this.showErrors = true;
            let controls = Object.keys(this.userForm.controls);
            controls.forEach(control => {
                this.userForm.controls[control].markAsTouched();
            });
        }
    }

    goToLogin() {
        this.appCtrl.getRootNav().pop();
    }

    isValidIsraeliID(sentId) {
        let id = String(sentId.value).trim();
        if (id.length > 9 || id.length < 5 || isNaN(sentId.value)) return { 'id': 'Not a valid Israeli id' };

        // Pad string with zeros up to 9 digits
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

        if (Array.from(id, Number)
            .reduce((counter, digit, i) => {
                const step = digit * ((i % 2) + 1);
                return counter + (step > 9 ? step - 9 : step);
            }) % 10 !== 0) {
            return { 'id': 'Not a valid israeli id' };
        }
    }

    isIsraeliPhone(phoneNumber) {
        if (!phoneRegex.test(phoneNumber.value)) {
            return { 'phone': 'Not a valid phone number' };
        }
    }

    isEmail(email) {
        if (!emailRegex.test(email.value)) {
            return { 'email': 'Not a valid email' };
        }
    }
}