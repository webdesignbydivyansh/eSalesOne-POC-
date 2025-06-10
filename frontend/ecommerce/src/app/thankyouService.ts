import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class thankyouService {
    
    private url='http://localhost:3000/product';

    constructor(private httpClient: HttpClient) {}

    getSummary(orderId: string): Observable<any> {
        return this.httpClient.get<any>(this.url+'/'+orderId);
    }
}