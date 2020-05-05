import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseUrl = 'http://localhost:8080/api/volume';

@Injectable({
    providedIn: 'root'
})
export class VolumeService {

    volumes: any[]

    constructor(private http: HttpClient) { }

    // Not used yet, if it is not used at the end, remove this line
    getAll() {
        return this.http.get(baseUrl);
    }

    // Not used yet, if it is not used at the end, remove this line
    get(id: number) {
        return this.http.get(`${baseUrl}/${id}`);
    }

    getAllwithArticles(){
        return this.http.get(`${baseUrl}/articles`);
    }

    findByLabel(search: string) {
        return this.http.get(`${baseUrl}/articles/?search=${search}`);
    }
}




