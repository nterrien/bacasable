import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseUrl = 'http://localhost:8080/api/volume';

@Injectable({
    providedIn: 'root'
})
export class VolumeService {

    volumes: any[]

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(baseUrl);
    }

    get(id: number) {
        return this.http.get(`${baseUrl}/${id}`);
    }

    getAllwithArticles(){
        return this.http.get(`${baseUrl}/articles`);
    }

    findByLabel(label: string) {
        return this.http.get(`${baseUrl}/articles/?label=${label}`);
    }
}




