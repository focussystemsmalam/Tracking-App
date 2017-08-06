import { ServerProxyService } from './ServerProxy';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AccountService {

    private user: User;

    set ConnectedUser(value: User) {
        this.user = value;
        localStorage.setItem("user", JSON.stringify(this.user));
    }

    get ConnectedUser(): User {
        if (!this.user) {
            this.user = JSON.parse(localStorage.getItem("user"));
        }
        return this.user;
    }

    constructor(private server: ServerProxyService) { }

    login(user: User) {
        return this.server.POST("getLogin", { userEmail: user.userEmail, userPassword: user.userPassword, userTelphone: null }).map(res => {
            if (res.UserDetails) {
                this.ConnectedUser = res.UserDetails;
            }else{
                alert("Login Error")
            }
            return res;
        });
    }

    getVerificationCode(user: User) {
        return this.server.POST("GetVerification", user).map(res => {
            if (res.IsExsist) {
                alert("User already exists");
            } else {
                alert(res.VerifyCode);
                return res;
            }
        });
    }

    createUser(user: User) {
        return this.server.POST("RegisterVerifiedUser", user).map(res => {
            if (res.status == 1) {
                this.ConnectedUser = res.userDetails;
            }

            return res.status;
        });
    }
}