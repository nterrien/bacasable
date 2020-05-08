import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) { }

  devisForm: FormGroup;
  articleControl = new FormControl();
  articles: any;
  filteredArticles: Observable<Article[]>[];


  ngOnInit(): void {
    this.initForm();
    this.getArticles();
    this.filteredArticles=[]
  }

  initForm() {
    this.devisForm = this.formBuilder.group({
      name: ['ICO', Validators.required],
      articles: this.formBuilder.array([])
    });
  }

  getArticlesInDevis(): FormArray {
    return this.devisForm.get('articles') as FormArray;
  }

  onAddArticle() {
    const newArticleControl = this.formBuilder.control(null, Validators.required);
    this.getArticlesInDevis().push(newArticleControl);
    const i = this.filteredArticles ? this.filteredArticles.length : 0;
    this.filteredArticles[i] = newArticleControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this._filter(label) : this.articles.slice()))

  }

  onSubmitForm() {
    console.log(this.devisForm.value);
  }


  //Affichage
  
  displayFn(article): string {
    return article ? article.label : '';
  }

  log() {
    console.log("articles", this.articles)
    console.log("filteredarticles", this.filteredArticles)
  }


  // DB
  getArticles() {
    this.articleService.getAll()
      .subscribe(
        data => {
          this.articles = data;
          // Used in dev, should be removed
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  private _filter(value: string): Article[] {
    const filterValue = value.toLowerCase();
    return this.articles.filter(article => article.label.toLowerCase().indexOf(filterValue) === 0);
  }

}
