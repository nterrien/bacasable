import { Injectable } from '@angular/core';
import { SectionService } from './section.service';
import { range } from 'rxjs';
import { ArticleService } from './article.service';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    //items : any[]
    articles: any;

    items = [{ id: 1, id_section: 1, label: 'DOSSIER ADMINISTRATIF ET SUIVI DE CHANTIER', comment: '' },
    { id: 2, id_section: 1, label: 'HONORAIRES', comment: '' },
    { id: 3, id_section: 1, label: 'COORDINATION SECURITE SANTE', comment: '' },
    { id: 4, id_section: 1, label: 'SONDAGE', comment: '' },
    { id: 5, id_section: 1, label: 'ETAT DES LIEUX', comment: '' },
    { id: 6, id_section: 1, label: 'ESSAIS ET TESTS', comment: '' },
    { id: 7, id_section: 1, label: 'TARIFS EN REGIE', comment: '' },
    { id: 8, id_section: 1, label: 'ASSURANCES', comment: '' },
    { id: 9, id_section: 2, label: 'FRAIS D\'INSTALLATION ET DE MESURAGE', comment: '' },
    { id: 10, id_section: 2, label: 'ACCES', comment: '' },
    { id: 11, id_section: 2, label: 'POSE DE CLOTURES DE CHANTIER', comment: '' },
    { id: 12, id_section: 2, label: 'PROTECTION DE SECURITE', comment: '' },
    { id: 13, id_section: 2, label: 'BARAQUE DE CHANTIER', comment: '' },
    { id: 14, id_section: 2, label: 'WC DE CHANTIER', comment: '' },
    { id: 15, id_section: 2, label: 'RACCORDEMENTS PROVISOIRES', comment: '' },
    { id: 16, id_section: 2, label: 'ECHAFAUDAGE EXTERIEUR', comment: '' },
    { id: 17, id_section: 2, label: 'ECHAFAUDAGE SUR ROUE EN ALUMINIUM', comment: '' },
    { id: 18, id_section: 2, label: 'MACHINES', comment: '' },
    { id: 19, id_section: 2, label: 'CONTENEUR (LOCATION ET MISE EN DECHARGE)', comment: '' },
    { id: 20, id_section: 2, label: 'PROTECTIONS ET NETTOYAGE', comment: '' }]
    // ... y'en a 300 + donc je met pas tous

    // constructor(private sectionService: SectionService) { }

    constructor(private articleService: ArticleService) { }

    getAll() {
        return this.items;
    }

    get(id: number) {
        if (id == null) {
            return null
        }
        else {
            return this.items.find(myObj => myObj.id == id);
        }
    }

    // getSection(id : number){
    //     const item = this.get(id)
    //     return this.sectionService.get(item.id_section);
    // }
    // getVolume(id: number) {
    //     const item = this.get(id)
    //     return this.sectionService.getVolume(item.id_section);
    // }

    retrieveArticles() {
        this.articleService.getAll()
            .subscribe(
                data => {
                    this.articles= data;
                },
                error => {
                    return [];
                });
    }

    getAllwithArticles() {

        this.retrieveArticles();
        const itemJoint = this.items;
        for (var index in itemJoint) {
            itemJoint[index]["articles"] = [];
        }

        for (var index in this.articles) {
            itemJoint[this.articles[index].id_item]["articles"].push(this.articles[index])
            console.log("ho hzho")
        }
        return itemJoint
    }

}




