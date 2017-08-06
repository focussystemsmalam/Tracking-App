import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerProxyService {
    serverUrl: string = "http://webfocus.malam.com:8096/TrackSDeliveryervice/";
    constructor(private http: Http) { }

    public GET(path): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverUrl + path).map(res => {
            return res.json();
        })
            .catch(err => {
                alert(err);
                return Observable.of(err.statusText || "Server Error");
            })
    }

    public POST(path, data): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);
        return this.http.post(this.serverUrl + path, body, options).map(res => {
            return res.json();
        })
            .catch(err => {
                return Observable.of(err);
            })
    }
}