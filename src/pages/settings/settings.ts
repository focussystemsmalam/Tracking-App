import { User } from './../../models/user';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
})

export class SettingsPage implements OnInit {

    tempUser: User;
    constructor(private account: AccountService) { }

    ngOnInit() {
        this.tempUser = this.account.ConnectedUser;
    }

    editUser() {

    }
}