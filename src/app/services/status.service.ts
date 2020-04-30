import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    //statuses : any[]

    statuses = [{ id: 1, label: 'À valider', comment: '' },
    { id: 2, label: 'Validé', comment: '' },
    { id: 3, label: 'Archivé', comment: '' },
    { id: 4, label: 'Autre', comment: '' }]

    constructor() { }

    getAll() {
        return this.statuses;
    }

    get(id: number) {
        return this.statuses.find(myObj => myObj.id == id);
    }
}




