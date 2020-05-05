import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/section';
@Injectable({
    providedIn: 'root'
})
export class SectionService {

    sections: any[]

    constructor(private http: HttpClient) { }

    // Not used yet, if it is not used at the end, remove this line
    getAll() {
        return this.http.get(baseUrl);
    }

    // Not used yet, if it is not used at the end, remove this line
    get(id: number) {
        return this.http.get(`${baseUrl}/${id}`);
    }
}




