import { Injectable } from '@angular/core';
import { SectionService } from './section.service';
import { range } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VolumeService {

    //volumes : any[]

    volumes = [{ id: 1, label: 'TRAVAUX PREPARATOIRES', comment: '' },
    { id: 2, label: 'INFRASTRUCTURE', comment: '' },
    { id: 3, label: 'SUPERSTRUCTURE', comment: '' },
    { id: 4, label: 'TRAVAUX DE TOITURE', comment: '' },
    { id: 5, label: 'FERMETURES DE FAÇADE', comment: '' },
    { id: 6, label: 'FINITIONS INTERIEURES', comment: '' },
    { id: 7, label: 'TECHNIQUES - FLUIDES (HVAC)', comment: '' },
    { id: 8, label: 'ELECTRICITE', comment: '' },
    { id: 9, label: 'TRAVAUX DE PEINTURE', comment: '' },
    { id: 10, label: 'EQUIPEMENT ENVIRONNEMENTAL (AMENAGEMENTS EXTERIEURS)', comment: '' }]

    constructor(private sectionService: SectionService) { }

    getAll() {
        return this.volumes;
    }

    get(id: number) {
        if (id == null) { // En fait avec la fonction plus bas si il trouve pas ça va planter en gros, faudait mettre une garde aussi pour le cas ou l'id rechercher est plus haut ou plus bas que ce qu'on a sous la main
            return null // Peut etre mettre autre chose 
        }
        else {
            return this.volumes.find(myObj => myObj.id == id);
        }
    }

    getAllwithArticles() {
        const volumeJoint = this.volumes
        for (var index in volumeJoint) {
            volumeJoint[index]["sections"] = [];
        }
        const sections = this.sectionService.getAllwithArticles();
        for (var index in sections) {
            volumeJoint[sections[index].id_volume]["sections"].push(sections[index])
        }
        return volumeJoint
    }
}




