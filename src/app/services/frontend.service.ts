import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

 @Injectable()
 export class FrontendService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    }



 }
