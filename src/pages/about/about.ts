import { AppVersion } from "@ionic-native/app-version";
import { Platform, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'about',
    templateUrl: 'about.html'
})

export class AboutPage implements OnInit {

    appName: string = ""
    versionNumber: string = ""

    constructor(private platform: Platform, private appVersion: AppVersion, public viewCtrl: ViewController) {
    }

    ngOnInit(): void {
        if (this.platform.is("cordova")) {
            this.appVersion.getAppName().then(val => this.appName = val);
            this.appVersion.getVersionNumber().then(val => this.versionNumber = val);
        }
    }

    closeAbout() {
        this.viewCtrl.dismiss();
    }
}