import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';

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


  getAll() {
    return this.http.get(baseUrl);
  }


  // Not used yet, if it is not used at the end, remove this line
  getAllwithAllJoinTable() {
    return this.http.get(`${baseUrl}/all`);
  }

  get(id: number) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: Article) {
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
}
