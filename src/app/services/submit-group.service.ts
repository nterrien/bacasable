import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SubmitGroupService {

    //submit_group : any[]

    submit_group = [{ id: 1, label: 'Terrassement', comment: '' },
    { id: 2, label: 'Gros-oeuvre', comment: '' },
    { id: 3, label: 'Égouttage', comment: '' },
    { id: 4, label: 'CLT', comment: '' },
    { id: 5, label: 'Charpente', comment: '' },
    { id: 6, label: 'Couverture', comment: '' },
    { id: 7, label: 'Châssis', comment: '' },
    { id: 8, label: 'Isolation', comment: '' },
    { id: 9, label: 'Façade', comment: '' },
    { id: 10, label: 'Chauffage', comment: '' },
    { id: 11, label: 'Sanitaires', comment: '' },
    { id: 12, label: 'Ventilation', comment: '' },
    { id: 13, label: 'Peinture', comment: '' },
    { id: 14, label: 'Plafonnage', comment: '' },
    { id: 15, label: 'Cloison', comment: '' },
    { id: 16, label: 'Finition sol', comment: '' },
    { id: 17, label: 'Carrelage', comment: '' },
    { id: 18, label: 'Isolation sol', comment: '' },
    { id: 19, label: 'Chappe', comment: '' },
    { id: 20, label: 'Électricité', comment: '' }]

    constructor() { }

    getAll() {
        return this.submit_group;
    }

    get(id: number) {
        if (id == null) { // En fait avec la fonction plus bas si il trouve pas ça va planter en gros, faudait mettre une garde aussi pour le cas ou l'id rechercher est plus haut ou plus bas que ce qu'on a sous la main
            return {label : "Aucun"} // Peut etre mettre autre chose , c'est une reparation temporaire poru pas avoir d'erreur à chaque fois quej e lance meme si ça marchait 
            //return ""
        }
        else {
            return this.submit_group.find(myObj => myObj.id == id);
        }
    }
}




