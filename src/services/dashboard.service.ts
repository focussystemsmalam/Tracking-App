import { ServerProxyService } from './ServerProxy';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class DashboardService {

    constructor(private server: ServerProxyService) { }

    getStatuses() {
        return this.server.GET("GetStatusList");
    }

    updateStatus(data) {
        return this.server.POST("UpdateShipmentStatus", data).map(res => {
            debugger;
            let resend:any[] = JSON.parse(localStorage.getItem("resend"));
            if (!resend) {
                resend = [];
            }

            let alreadyInResend = resend.find(shipment => {
                return shipment.carrierVat == data.carrierVat &&
                    shipment.companyId == data.companyId &&
                    shipment.country == data.country &&
                    shipment.vatnumber == data.vatnumber &&
                    shipment.docnumber == data.docnumber &&
                    shipment.statusCode == data.statusCode;});

            if (!res.ok && res.result != 1) {
                if (!alreadyInResend) {
                    resend.push(data);
                    localStorage.setItem("resend", JSON.stringify(resend));
                }
                res.message = "An error has occurred";

            } else {
                if(alreadyInResend){
                    resend.splice(resend.indexOf(alreadyInResend),1);
                    localStorage.setItem("resend", JSON.stringify(resend));
                }
                res.message = "Success";
            }

            return res.message;
        });
    }


}