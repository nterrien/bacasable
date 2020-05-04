import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // constructor(
  //   private http: HttpClient,
  //   private statusService: StatusService,
  //   private submitGroupService: SubmitGroupService,
  //   private itemService: ItemService) { }

  constructor(
    private http: HttpClient) { }


  // Peut etre qu'on peux factoriser le code pour les deux fonctions getAll() (ce qui se fera dans le controller)
  getAll() {
    return this.http.get(baseUrl);
  }

  getAllwithAllJoinTable() {
    return this.http.get(`${baseUrl}/all`);
  }

  get(id: number) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: {
    label: string; description: string; comment: string; unit: string;
    minimal_quantity: number; price: number; percent_workforce: number;
    subcontractable: boolean; up_to_date: boolean; id_submit: any; id_item: number;
    status: number;
  }) {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByLabel(label: string) {
    return this.http.get(`${baseUrl}/all/?search=${label}`);
  }

  // getItem(article) {
  //   return this.itemService.get(article.id_item);
  // }
  // getSection(article) {
  //   return this.itemService.getSection(article.id_item);
  // }
  // getVolume(article) {
  //   return this.itemService.getVolume(article.id_item);
  // }
}
