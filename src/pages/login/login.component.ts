import { TabsPage } from './../tabs/tabs';
import { CreateAccountPage } from './../create-account/create-account.component';
import { App } from 'ionic-angular';
import { User } from './../../models/user';
import { AccountService } from './../../services/account.service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styles: [`
      ion-item.ng-valid.ng-touched{
          border-bottom-color: #32db64;
         -webkit-box-shadow: inset 0 -2px 0 0 #32db64;
          box-shadow: inset 0 -2px 0 0 #32db64;
      }
      ion-item{
        width:100%;
    }
    `]
})

export class LoginPage implements OnInit {
    constructor(private googlePlus: GooglePlus, private account: AccountService, public appCtrl: App) { }

    tempUser: User = { userPID: '', firstName: '', lastName: '', userEmail: '', userPassword: '', countryCode: '', userTelephone: '' };

    ngOnInit() {
        if (this.account.ConnectedUser) {
            this.goToHome();
        }
    }

    getGoogleDetails() {
        this.googlePlus.login({
            'webClientId': '860126579328-dcea8032pjl2f5opmujsnj5cqqbutc5s.apps.googleusercontent.com',
            'offline': true
        }).then(res => {
            this.tempUser = { userPID: '', firstName: res.givenName, lastName: res.familyName, userEmail: res.email, userPassword: res.idToken, countryCode: "", userTelephone: "" };
        })
            .catch(err => alert("error" + JSON.stringify(err)));
    }

    goToCreateAccount() {
        this.appCtrl.getRootNav().push(CreateAccountPage);
    }


    login() {
        // this.account.ConnectedUser = this.tempUser;
        // this.appCtrl.getRootNav().push(HomePage);
        this.account.login(this.tempUser).subscribe(res => {
            if (res.UserDetails) {
                this.goToHome();
            } else {
                alert(res.Reason);
            }
        })
    }


    goToHome() {
        this.appCtrl.getRootNav().setRoot(TabsPage);
        this.appCtrl.getRootNav().popAll();
        this.appCtrl.getRootNav().push(TabsPage);
    }

}