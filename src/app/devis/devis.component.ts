import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { Customer } from '../models/customer.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CustomerService } from '../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer'
import { MarketTypeService } from '../services/market_type.service';

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
    private customerService: CustomerService,
    private elRef: ElementRef,
    private marketTypeService: MarketTypeService,
  ) { }

  devisForm: FormGroup;
  articles: any;
  customers: any;
  marketType: any;
  newCustomer: Customer = { name: '', address: '', comment: '', mail: '', id_city: null }
  filteredArticles: Observable<Article[]>[];

  filteredArticlesInSection: Observable<Article[]>[][];
  filteredCustomers: Observable<Customer[]>;

  numberOfSection: number;

  @ViewChild('buttonOpenNewCustomer') element: ElementRef;


  ngOnInit(): void {
    this.getArticles();
    this.getCustomers();
    this.getMarketType();
    this.numberOfSection = 0
    this.initForm();
    this.filteredArticles = [];
  }

  initForm() {
    this.filteredArticlesInSection = [];
    this.devisForm = this.formBuilder.group({
      name: ['ICO', Validators.required],
      client: ['', Validators.required],
      'section': this.formBuilder.array([])
    });
  }

  initSection() {
    this.numberOfSection = this.numberOfSection + 1;
    const ix = this.filteredArticlesInSection ? this.filteredArticlesInSection.length : 0;
    this.filteredArticlesInSection[ix] = [];
    const newArticleControl = this.initArticles();
    const i = this.filteredArticlesInSection[ix] ? this.filteredArticlesInSection[ix].length : 0;
    this.filteredArticlesInSection[ix][i] = newArticleControl.controls['article'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this._filterArticle(label) : this.articles.slice()))
    return this.formBuilder.group({
      // This ID is used to allow drag n drop between two different lists
      'id': this.numberOfSection,
      'name': ['', [Validators.required]],
      'articles': this.formBuilder.array([
        newArticleControl
      ])
    });
  }

  initArticles() {
    return this.formBuilder.group({
      'article': ['', [Validators.required]],
      'market_type': ['', [Validators.required]],
      'quantity': [0, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{0,2})?$/)]]
    })
  }

  addSection() {
    const control = <FormArray>this.devisForm.controls['section'];
    control.push(this.initSection());
  }


  addArticles(ix: number) {
    const control = (<FormArray>this.devisForm.controls['section']).at(ix).get('articles') as FormArray;
    const newArticleControl = this.initArticles()
    control.push(newArticleControl);
    const i = this.filteredArticlesInSection[ix] ? this.filteredArticlesInSection[ix].length : 0;
    this.filteredArticlesInSection[ix][i] = newArticleControl.controls['article'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this._filterArticle(label) : this.articles.slice()))
  }

  getSectionInDevis(): FormArray {
    return this.devisForm.get('section') as FormArray;
  }

  getArticlesInSection(ix: number): FormArray {
    return this.devisForm.get(['section', ix, 'articles']) as FormArray;
  }

  onAddCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      width: '240px',
      // Choisis la position du popup, je l'ai mis un peu n'improte ou, ce qui compte c'est de savoir comment on le bouge,
      // et aussi de savoir qu'on peux le placer par rapport aux coordonnée d'un ature éléments sur la page
      position: {
        top: this.elRef.nativeElement.offsetTop + 120 + 'px',
        left: this.elRef.nativeElement.offsetLeft + 50 + 'px'
      },
      // positionRelativeToElement: , https://stackoverflow.com/questions/58757670/angular-material-how-to-position-matdialog-relative-to-element
      // hasBackdrop: false, Pour pas quitter quand on clique a coté de la fenetre
      data: this.newCustomer
    });

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

  displayArticles(article: Article): string {
    return article ? article.label : '';
  }

  displayCustomer(customer: Customer): string {
    return customer ? customer.name + " ; " + customer.address : '';
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   //Peut etre que patchValue pourrait faire ça en une seul ligne ? 
  //   moveItemInArray(this.devisForm.value['articles'], event.previousIndex, event.currentIndex);
  //   moveItemInArray(this.getArticlesInDevis().controls, event.previousIndex, event.currentIndex);
  //   moveItemInArray(this.filteredArticles, event.previousIndex, event.currentIndex);
  // }

  dropArticle(event: CdkDragDrop<string[]>, ix: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.devisForm.value['section'][ix]['articles'], event.previousIndex, event.currentIndex);
      moveItemInArray(this.getArticlesInSection(ix).controls, event.previousIndex, event.currentIndex);
      moveItemInArray(this.filteredArticlesInSection[ix], event.previousIndex, event.currentIndex);
    } else {
      const currentSectionIndex = Number(event.container.data);
      const previousSectionIndex = Number(event.previousContainer.data);
      transferArrayItem(this.devisForm.value['section'][previousSectionIndex]['articles'],
        this.devisForm.value['section'][currentSectionIndex]['articles'],
        event.previousIndex,
        event.currentIndex);
      transferArrayItem(this.getArticlesInSection(previousSectionIndex).controls,
        this.getArticlesInSection(currentSectionIndex).controls,
        event.previousIndex,
        event.currentIndex);
      transferArrayItem(this.filteredArticlesInSection[previousSectionIndex],
        this.filteredArticlesInSection[currentSectionIndex],
        event.previousIndex,
        event.currentIndex);
    }
  }

  getConnectedList(): any[] {
    return this.devisForm.value["section"].map(x => `${x.id}`);
  }

  dropSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.devisForm.value["section"], event.previousIndex, event.currentIndex);
    moveItemInArray(this.getSectionInDevis().controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.filteredArticlesInSection, event.previousIndex, event.currentIndex);
  }

  // DB
  getArticles() {
    this.articleService.getAll()
      .subscribe(
        data => {
          this.articles = data;
          // Used in dev, should be removed
          // console.log(data);

          // Je devrais surement pas fiare comme ça, 
          //mais j'aimerai bien ajouter une section une fois que
          // les articles on été recuperer maisj e sais pas comment fiare
          //poru attendre que la focntion ait ifini autrement uqe comme ça 
          this.addSection()
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

  getMarketType() {
    this.marketTypeService.getAll()
      .subscribe(
        data => {
          this.marketType = data;
        },
        error => {
          console.log(error);
        });
  }

  saveCustomer(data: Customer) {
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
    return this.articles.filter((article: Article) => article.label.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCustomer(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter((customer: Customer) => customer.name.toLowerCase().indexOf(filterValue) === 0);
  }

}