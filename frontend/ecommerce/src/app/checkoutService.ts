import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class checkoutService {
    private url='http://localhost:3000/product';

    constructor(private httpClient: HttpClient) {}

    postProductDetails(product: any): Observable<any> {
        console.log('product=',product);
        return this.httpClient.post<any>(this.url, product);
    }
}