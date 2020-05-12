import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { Customer } from '../models/customer.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CustomerService } from '../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer'

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private customerService: CustomerService
  ) { }

  devisForm: FormGroup;
  articles: any;
  customers: any;
  newCustomer: Customer = { name: '', address: '', comment: '', mail: '', id_city: null }
  filteredArticles: Observable<Article[]>[];
  filteredCustomers: Observable<Customer[]>;


  ngOnInit(): void {
    this.initForm();
    this.getArticles();
    this.getCustomers();
    this.filteredArticles = []
  }

  initForm() {
    this.devisForm = this.formBuilder.group({
      name: ['ICO', Validators.required],
      client: ['', Validators.required],
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
        map(label => label ? this._filterArticle(label) : this.articles.slice()))

  }

  onAddCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      width: '250px',
      data: this.newCustomer
    });
    //console.log(this.newCustomer)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCustomer(result);
      }
      //this.newCustomer = { name: '', address: '', comment: '', mail: '', id_city: null }
    });
  }

  onSubmitForm() {
    console.log(this.devisForm.value);
  }


  //Affichage

  displayArticles(article): string {
    return article ? article.label : '';
  }

  displayCustomer(customer): string {
    return customer ? customer.name + " ; " + customer.address : '';
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.devisForm.value['articles'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.getArticlesInDevis().controls, event.previousIndex, event.currentIndex)
    moveItemInArray(this.filteredArticles, event.previousIndex, event.currentIndex);
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


  getCustomers() {
    this.customerService.getAll()
      .subscribe(
        data => {
          this.customers = data;
          // Used in dev, should be removed
          //console.log(data);
          this.filteredCustomers = this.devisForm.controls['client'].valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterCustomer(name) : this.customers.slice()))
        },
        error => {
          console.log(error);
        });
  }

  saveCustomer(data) {
    //console.log(data);
    this.customerService.create(data)
      .subscribe(
        response => {
          //Pas tres propre comme code
          this.devisForm.patchValue({ client: response });
          this.getCustomers();
        },
        error => {
          console.log(error);
        });

  }

  private _filterArticle(value: string): Article[] {
    const filterValue = value.toLowerCase();
    return this.articles.filter(article => article.label.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCustomer(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(customer => customer.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
