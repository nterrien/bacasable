import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/status';

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    statuses : any[]

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(baseUrl);
    }

    get(id: number) {
        return this.http.get(`${baseUrl}/${id}`);
    }
}




