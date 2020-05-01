import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/submit';
@Injectable({
    providedIn: 'root'
})
export class SubmitGroupService {

    submit_group : any[]

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(baseUrl);
    }

    get(id: number) {
        return this.http.get(`${baseUrl}/${id}`);
    }
}




