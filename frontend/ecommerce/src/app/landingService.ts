import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class landingService {
    
    private url='assets/product.json';

    constructor(private httpClient: HttpClient) {}

    getProduct(): Observable<any> {
        return this.httpClient.get<any>(this.url);
    }
}