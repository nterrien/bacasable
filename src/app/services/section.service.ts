import { Injectable } from '@angular/core';
import { ItemService } from './item.service';
import { range } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SectionService {

    //sections : any[]

    sections = [{ id: 1, id_volume: 1, label: 'PREPARATION ET INSTALLATION DE CHANTIER', comment: '' },
    { id: 2, id_volume: 1, label: 'INSTALLATION DE CHANTIER', comment: '' },
    { id: 3, id_volume: 1, label: 'DEMOLITION AVEC EVACUATION', comment: '' },
    { id: 4, id_volume: 2, label: 'TERRASSEMENT', comment: '' },
    { id: 5, id_volume: 2, label: 'ETAIEMENT ET REPRISE EN SOUS-OEUVRE', comment: '' },
    { id: 6, id_volume: 2, label: 'FONDATION SUR SEMELLE', comment: '' },
    { id: 7, id_volume: 2, label: 'FONDATION SPECIALE', comment: '' },
    { id: 8, id_volume: 2, label: 'MAÇONNERIE ENTERREE', comment: '' },
    { id: 9, id_volume: 2, label: 'DALLE DE SOL', comment: '' },
    { id: 10, id_volume: 2, label: 'ISOLANTS ENTERRES', comment: '' },
    { id: 11, id_volume: 2, label: 'EGOUTTAGE', comment: '' },
    { id: 12, id_volume: 3, label: 'MAÇONNERIE D\'ELEVATION', comment: '' },
    { id: 13, id_volume: 3, label: 'MURS NON PORTEUR', comment: '' },
    { id: 14, id_volume: 3, label: 'ISOLATION SURFACE EXTERIEURE', comment: '(sauf crépis sur isolant)' },
    { id: 15, id_volume: 3, label: 'MAÇONNERIE DE PAREMENT', comment: '' },
    { id: 16, id_volume: 3, label: 'ELEMENT DE FAÇADE', comment: '' },
    { id: 17, id_volume: 3, label: 'CHEMINEE', comment: '' },
    { id: 18, id_volume: 3, label: 'STRUCTURES EN BETON', comment: '' },
    { id: 19, id_volume: 3, label: 'STRUCTURE EN ACIER', comment: '' },
    { id: 20, id_volume: 3, label: 'DALLES PORTANTES EN BETON', comment: '' }]
    // Y'en a 72 donc j'ai pas tous mis

    // constructor(private volumeService: VolumeService) { }

    constructor(private itemService: ItemService) { }

    getAll() {
        return this.sections;
    }

    get(id: number) {
        if (id == null) { // En fait avec la fonction plus bas si il trouve pas ça va planter en gros, faudait mettre une garde aussi pour le cas ou l'id rechercher est plus haut ou plus bas que ce qu'on a sous la main
            return null //Peut etre mettre autre chose ici
        }
        else {
            return this.sections.find(myObj => myObj.id == id);
        }
    }

    // getVolume(id: number) {
    //     const section = this.get(id)
    //     return this.volumeService.get(section.id_volume);
    // }



    getAllwithArticles() {
        const sectionJoint = this.sections;
        for (var index in sectionJoint) {
            sectionJoint[index]["items"] = [];
        }
        const items = this.itemService.getAllwithArticles();
        for (var index in items) {
            sectionJoint[items[index].id_section]["items"].push(items[index])
        }
        return sectionJoint
    }
}




