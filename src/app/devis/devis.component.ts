import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { Customer } from '../models/customer.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CustomerService } from '../services/customer.service';
import { SubmitGroupService } from '../services/submit-group.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer'
import { MarketTypeService } from '../services/market_type.service';
var accents = require('remove-accents');

import { company_config } from './company-infos'

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import pdfMake from 'pdfmake/build/pdfmake';
import { CityService } from '../services/city.service';
var pdfFonts = require("../../assets/fonts/vfs_fonts"); // To use Arial font
// import pdfFonts from 'pdfmake/build/vfs_fonts'; // To use default font (Roboto1)
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  // The form
  devisForm: FormGroup;

  logo: any;

  // List of object from the Database
  articles: any;
  customers: any;
  marketType: any;
  TVAList: any[];
  submitGroup: any;
  // Right now there is no cities in the database so i do not know if it works
  cities: any;

  // Used for autocompletion
  filteredArticlesInSection: Observable<Article[]>[][];
  filteredSubmitGroupInSection: Observable<any[]>[][];
  filteredCustomers: Observable<Customer[]>;

  // Used to have a unique id per section
  numberOfSection: number;

  // Used to add a customer
  @ViewChild('buttonOpenNewCustomer') element: ElementRef;
  newCustomer: Customer = { name: '', address: '', comment: '', mail: '', id_city: null }

  constructor(
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private elRef: ElementRef,
    private marketTypeService: MarketTypeService,
    private submitGroupService: SubmitGroupService,
    private cityService: CityService,
  ) { }

  ngOnInit(): void {
    // Maybe we should await between each call to database to be sure to have no bug.
    this.getArticles();
    this.getCustomers();
    this.getCities();
    this.getMarketTypes();
    this.logo = this.getBase64ImageFromURL(company_config.logo);
    this.TVAList = [{ 'label': "Régime TVA : Nouvelle construction (21%)", 'tva': 0.21 },
    { 'label': "Régime TVA : Rénovation résidentiel < 10 ans (21%)", 'tva': 0.21 },
    { 'label': "Régime TVA : Rénovation résidentiel > 10 ans (6%)", 'tva': 0.06 }]
    this.numberOfSection = 0;
    this.initForm();
  }

  initForm() {
    this.filteredArticlesInSection = [];
    this.filteredSubmitGroupInSection = [];
    this.devisForm = this.formBuilder.group({
      // name: ['ICO Ingénieurie & Construction', Validators.required], 
      client: ['', Validators.required],
      section: this.formBuilder.array([]),
      reference: ['P-', Validators.required],
      version: [1, [Validators.required, Validators.pattern(/^[0-9]$/)]],
      tva: [this.TVAList[0], Validators.required],
      titre: ['', Validators.required],
    });
  }

  initSection() {
    this.numberOfSection = this.numberOfSection + 1;
    const ix = this.filteredArticlesInSection ? this.filteredArticlesInSection.length : 0;
    this.filteredArticlesInSection[ix] = [];
    this.filteredSubmitGroupInSection[ix] = [];
    const newArticleControl = this.initArticles();
    const i = this.filteredArticlesInSection[ix] ? this.filteredArticlesInSection[ix].length : 0;
    this.filteredArticlesInSection[ix][i] = newArticleControl.controls['article'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this._filterArticle(label) : this.articles.slice()));
    this.filteredSubmitGroupInSection[ix][i] = newArticleControl.controls['submit_group'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this._filterSubmitGroup(label) : this.submitGroup.slice()));
    // Used to update submit group when an article is selected
    // Unsubscribe this if we do a delete article feature
    newArticleControl.controls['article'].valueChanges.subscribe(
      val => val.id_submit ? newArticleControl.patchValue({ 'submit_group': this.submitGroup.find(myObj => myObj.id == val.id_submit) }) : '');

    return this.formBuilder.group({
      // This ID is used to allow drag n drop between two different lists
      // It does not have to be registered in the database, and would probably be useless in the database
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
      'quantity': [0, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{0,2})?$/)]],
      'submit_group': [''],
      //Je sais pas trop ce que c'est donc je reste sur un truc basique
      'risk_factor': [0, [Validators.required]]
    });
  }

  addSection() {
    const control = <FormArray>this.devisForm.controls['section'];
    control.push(this.initSection());
  }

  addArticles(ix: number) {
    const control = (<FormArray>this.devisForm.controls['section']).at(ix).get('articles') as FormArray;
    const newArticleControl = this.initArticles();
    control.push(newArticleControl);
    const i = this.filteredArticlesInSection[ix] ? this.filteredArticlesInSection[ix].length : 0;
    this.filteredArticlesInSection[ix][i] = newArticleControl.controls['article'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this._filterArticle(label) : this.articles.slice()));
    this.filteredSubmitGroupInSection[ix][i] = newArticleControl.controls['submit_group'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this._filterSubmitGroup(label) : this.submitGroup.slice()));
    // Used to update submit group when an article is selected
    // Maybe we should Unsubscribe this in the delete article feature
    newArticleControl.controls['article'].valueChanges.subscribe(
      val => val.id_submit ? newArticleControl.patchValue({ 'submit_group': this.submitGroup.find(myObj => myObj.id == val.id_submit) }) : '');
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

  getSectionInDevis(): FormArray {
    return this.devisForm.get('section') as FormArray;
  }

  getArticlesInSection(ix: number): FormArray {
    return this.devisForm.get(['section', ix, 'articles']) as FormArray;
  }

  getTotalPriceSection(ix: number) {
    var price = 0;
    const articles = this.getArticlesInSection(ix).value
    for (var articl in articles) {
      if (Number(articles[articl]['quantity']) != NaN && articles[articl]['article']['price'] != null) {
        price += articles[articl]['quantity'] * articles[articl]['article']['price'];
      }
    }
    return price;
  }

  getTotalPrice() {
    var price = 0;
    const sections = this.getSectionInDevis().value;
    for (var ix in sections) {
      price += this.getTotalPriceSection(Number(ix));
    }
    return price;
  }

  deleteSection(ix: number) {
    this.getSectionInDevis().removeAt(ix)
    this.filteredArticlesInSection.splice(ix, 1);
    this.filteredSubmitGroupInSection.splice(ix, 1);
  }

  deleteArticle(ix: number, iy: number) {
    this.getArticlesInSection(ix).removeAt(iy)
    this.filteredArticlesInSection[ix].splice(iy, 1);
    this.filteredSubmitGroupInSection[ix].splice(iy, 1);
  }

  onSubmitForm() {
    // TODO
    // Save Form here
    console.log(this.devisForm);
  }

  newVersion() {
    //TODO
    this.onSubmitForm();
    // Open new quote with  the same data as in this one and :
    this.devisForm.value['version'] + 1
  }



  // PDF

  generatePdf() {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.fonts = {
      Arial: {
        normal: 'Arial.ttf',
        bold: 'Arial_Bold.ttf',
        italics: 'Arial_Italic.ttf',
        bolditalics: 'Arial_Bold_Italic.ttf'
      }
    } // Comment to use default font Roboto
    // Choose between open and download
    pdfMake.createPdf(documentDefinition).open();
    // pdfMake.createPdf(documentDefinition).download('Devis-' + this.devisForm.value['reference'] +"-" +this.devisForm.value['client'].name + '-V'+ this.devisForm.value['version']);
  }

  getDocumentDefinition() {
    sessionStorage.setItem('devis', JSON.stringify(this.devisForm.value));
    return {
      info: {
        // TODO
        title: 'Devis-' + this.devisForm.value['reference'] + "-" + this.devisForm.value['client'].name + '-V' + this.devisForm.value['version'],
        author: 'ICO Ingénierie & Construction',
        subject: 'Devis',
        creator: 'ICO Ingénierie & Construction'
      },
      content: [
        {
          table: {
            body: [
              [{
                image: this.logo.__zone_symbol__value,
                width: 49,
                alignment: 'center'
              }],
              [{
                text: "\n",
                border: [false, false, false, true],
              }],
              [{
                text: company_config.name,
              }],
              [{
                text: company_config.street
              }],
              [{
                text: company_config.city
              }],
              [{
                text: company_config.country,
              }],
              [{
                text: "Téléphone : " + company_config.phone,
              }],
              [{
                text: 'Email : ' + company_config.mail,
              }],
              [{
                text: 'Web : ' + company_config.website,
                link: company_config.website,
                border: [false, false, false, true],
              }]
            ]
          },
          layout: {
            defaultBorder: false,
          },
        },
        {
          columns: [
            [
              {
                text: this.devisForm.value.client.name,
                style: 'client'
              },
              {
                text: this.devisForm.value.client.address,
                style: 'client'
              },
              {
                text: this.devisForm.value.client.id_city ? this.cities.filter(myObj => myObj.id == this.devisForm.value.client.id_city).name_city : '\n', //TODo 
                style: 'client'
              },
              {
                text: "Reference : " + this.devisForm.value.reference, //Find what it is
                style: 'metaQuote'
              },
              {
                text: "Date du devis : " + this.getFullDateFormatted(new Date(Date.now())), //Find what it is
                style: 'metaQuote'
              },
              {
                text: "Version : " + this.devisForm.value.version, //Find what it is
                style: 'metaQuote'
              },
              {
                text: this.devisForm.value.tva.label,
                style: 'metaQuote'
              },
              {
                text: "Titre : " + this.devisForm.value.titre, //Find what it is
                style: 'metaQuote'
              },
              { text: "\n" }]]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'], // façon de faire logique
            // widths: [254, 27, 27, 29, 39, 59], //Façon de faire si on essaie de ressembler au maximum a la google sheets
            body: this.constructRowArticlesTable()
          },
          layout: {
            defaultBorder: false,
            // Add the dashed border line
            hLineStyle: function (i, node) {
              if (node.table.body[i] && i != 0 && i != node.table.body.length - 1 && i != node.table.body.length - 2 &&
                node.table.body[i][0]['style'] != "sectionHeader" && node.table.body[i - 1][0]['style'] != "sectionHeader") {
                return { dash: { length: 2, space: 2 } };
              }
              return null;
            },
          },
        },
        {
          //What is written here does not change i think.
          table: {
            widths: ['auto'],
            body: [
              [{ text: '\n', style: 'headerTable' }],
              [{ text: 'Conditions de chantier:', style: 'headerTable' }],
              [{ text: "- Fourniture de l'eau et de l'électricité sur chantier à charge du propriétaire", style: 'tableContent' }],
              [{ text: "- Le raccordement à l'égout n'est pas inclus", style: 'tableContent' }],
              [{ text: "\n", style: 'tableContent' }],
              [{ text: "Conditions de paiement :", style: 'tableContent', fontSize: 10, }],
              [{ text: "15% d’acompte à la signature du contrat", style: 'tableContent' }],
              [{ text: "25% du montant total des travaux au début des travaux", style: 'tableContent' }],
              [{ text: "55% du montant de chaque poste à la clôture de chacun de ces postes", style: 'tableContent' }],
              [{ text: "sauf châssis et ossature CLT payé à la signature des plans de fabrication", style: 'tableContent' }],
              [{ text: "Solde à la réception des travaux", style: 'tableContent' }],
              [{ text: "\n", style: 'tableContent' }],
              [{ text: "Moyen de paiement : Virement bancaire", style: 'headerTable', border: [false, true, false, false] }],
              [{ text: "\n", style: 'tableContent' }],
              [{ text: "La signature du devis implique l'acceptation des conditions générales de ventes", border: [false, true, false, false], style: 'tableContent' }],
              [{ text: "\n", style: 'tableContent' }]
            ]
          },
          layout: {
            defaultBorder: false,
            // Add the dashed border line
            hLineStyle: function (i, node) {
              return { dash: { length: 2, space: 2 } };
            }
          }
        },
        {
          //What is written here does not change i think.
          table: {
            headerRows: 0,
            widths: ['*'],
            body: [
              [{ text: 'BON DE COMMANDE', style: 'headerTable', alignment: 'center' }],
              [{ text: "Nom :", style: 'tableContent' }],
              [{ text: "Prénom :", style: 'tableContent' }],
              [{ text: "Tel/GSM du contact :", style: 'tableContent' }],
              [{ text: "Adresse email du contact :", style: 'tableContent' }],
              [{ text: "Société :", style: 'tableContent' }],
              [{ text: "Numéro de TVA :", style: 'tableContent' }],
              [{ text: "Adresse de facturation :", style: 'tableContent' }],
              [{ text: "Adresse du chantier (si différente) :", style: 'tableContent' }],
              [{
                text: "Date et signature :\n\n(Merci de parapher toutes les pages du devis, y compris les conditions générales)", style: 'tableContent'
              }]]
          }
        }],
      defaultStyle: {
        fontSize: 11,
        font: 'Arial' // Comment to use default font (Roboto)
      },
      styles: {
        client: {
          fontSize: 9,
          bold: true,
          lineHeight: 1.5,
          margin: [316, 0, 0, 0]
        },
        metaQuote: {
          bold: true,
          lineHeight: 1.2
        },
        headerTable: {
          fontSize: 9,
          bold: true,
        },
        sectionHeader: {
          fontSize: 9,
          bold: true,
          fillColor: '#d9d9d9'
        },
        articleLabel: {
          fontSize: 10,
        },
        tableContent: {
          fontSize: 9,
        },
        articleComment: {
          fontSize: 9,
          color: '#666666',
        }
      }
    };
  }

  applyDottedBorder(i, node) {
    return (node.table.body[i] && i != 0 &&
      (node.table.body[i][1]['text'] != undefined && node.table.body[i][2]['text'] != undefined && node.table.body[i][3]['text'] != undefined && node.table.body[i][4]['text'] != undefined && node.table.body[i][5]['text'] != undefined)
      && (node.table.body[i - 1][1]['text'] != undefined && node.table.body[i - 1][2]['text'] != undefined && node.table.body[i - 1][3]['text'] != undefined && node.table.body[i - 1][4]['text'] != undefined && node.table.body[i - 1][5]['text'] != undefined)
      && i != node.table.length - 1 && i != node.table.length - 2 && i != node.table.length - 3)
  }


  constructRowArticlesTable() {
    var table: any;
    var totalPrice = 0;
    table = [
      [{ text: 'Description', style: "headerTable", border: [false, false, false, true] },
      { text: 'TM', style: "headerTable", border: [false, false, false, true] },
      { text: 'Q', style: "headerTable", alignment: 'center', border: [false, false, false, true] },
      { text: 'U', style: "headerTable", alignment: 'right', border: [false, false, false, true] },
      { text: 'PU', style: "headerTable", alignment: 'center', border: [false, false, false, true] },
      { text: 'Montant', style: "headerTable", alignment: 'center', border: [false, false, false, true] }]];
    for (var section in this.devisForm.value['section']) {
      var subprice = 0;
      // Section 
      table.push([{ colSpan: 6, text: this.devisForm.value['section'][section]['name'], style: "sectionHeader", border: [false, false, false, true] }])
      for (var article in this.devisForm.value['section'][section]['articles']) {
        const currentArticle = this.devisForm.value['section'][section]['articles'][article];
        var price = currentArticle['quantity'] * currentArticle['article']['price']
        subprice += price ? price : 0;
        const border = [false, true, false, false];
        table.push(
          // Article
          [{ text: currentArticle['article']['label'], border: border, style: "articleLabel" },
          { text: currentArticle['market_type'] ? this.marketType.filter((myObj => myObj.id == currentArticle['market_type']))[0].acronym : '', border: border, style: "tableContent" },
          { text: this.formatNumber(currentArticle['quantity']), noWrap: true, border: border, alignment: 'right', style: "tableContent" },
          { text: currentArticle['article']['unit'], border: border, alignment: 'right', style: "tableContent" },
          { text: this.formatNumber(currentArticle['article']['price']) + '€', border: border, alignment: 'right', style: "tableContent" },
          { text: this.formatNumber(price) + '€', border: border, alignment: 'right', style: "tableContent" }],
          // Comments about the Article 
          [{ text: currentArticle['article']['description'], style: "articleComment" },
          { colSpan: 5, text: '', style: "articleComment" }])
      }
      totalPrice += subprice ? subprice : 0;
      // Section's Subprice
      table.push(
        [{ text: '', border: [false, true, false, false] },
        { text: '', border: [false, true, false, false] },
        { text: '', border: [false, true, false, false] },
        { text: '', border: [false, true, false, false] },
        { text: 'Sous-total', style: "tableContent", noWrap: true, alignment: 'right', border: [false, true, false, false], bold: true },
        { text: this.formatNumber(subprice) + '€', style: "tableContent", alignment: 'right', border: [false, true, false, false] }])
    }
    // The four last rows
    table.push([{ colSpan: 6, text: '\n' }],
      [{ text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: 'Total HTVA', style: "tableContent", alignment: 'right', border: [false, false, false, true], bold: true },
      { text: this.formatNumber(totalPrice) + '€', style: "tableContent", alignment: 'right', border: [false, false, false, true] }],
      [{ text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: 'TVA ' + this.devisForm.value.tva.tva * 100 + '%', style: "tableContent", alignment: 'right', border: [false, false, false, true], bold: true },
      { text: this.formatNumber(totalPrice * this.devisForm.value.tva.tva) + '€', style: "tableContent", alignment: 'right', border: [false, false, false, true] }],
      [{ text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: 'Total TVAC', style: "tableContent", alignment: 'right', noWrap: true, border: [false, false, false, true], bold: true },
      { text: this.formatNumber(totalPrice * (1 + this.devisForm.value.tva.tva)) + '€', noWrap: true, style: "tableContent", alignment: 'right', border: [false, false, false, true] }])
    return table
  }

  formatNumber(price: number) {
    return price ? price.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ /g, ' ') : '0,00';
  }

  getFullDateFormatted(date: Date) {
    var result = '';
    if (date.getUTCDate() < 10) {
      result += '0' + date.getUTCDate() + "/";
    }
    else {
      result += date.getUTCDate() + "/";
    }
    if (date.getUTCMonth() < 10) {
      result += '0' + date.getUTCMonth() + "/";
    }
    else {
      result += date.getUTCMonth() + "/";
    }
    result += date.getUTCFullYear();
    return result
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  //AutoComplete functions

  displayArticles(article: Article): string {
    return article ? article.label : '';
  }

  displayCustomer(customer: Customer): string {
    return customer ? customer.name + " ; " + customer.address : '';
  }

  displaySubmitGroup(submit): string {
    return submit ? submit.label : '';
  }

  private _filterArticle(value: string): Article[] {
    const filterValue = value.toLowerCase();
    return this.articles.filter((article: Article) => accents.remove(article.label.toLowerCase()).indexOf(accents.remove(filterValue)) != -1);
  }

  private _filterCustomer(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter((customer: Customer) => accents.remove(customer.name.toLowerCase()).indexOf(accents.remove(filterValue)) != -1);
  }


  private _filterSubmitGroup(value: any): any {
    const filterValue = value.toLowerCase();
    return this.submitGroup.filter((submit_group: any) => accents.remove(submit_group.label.toLowerCase()).indexOf(accents.remove(filterValue)) != -1);
  }

  // Drag and Drop functions

  //// Section

  dropSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.getSectionInDevis().value, event.previousIndex, event.currentIndex);
    moveItemInArray(this.getSectionInDevis().controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.filteredArticlesInSection, event.previousIndex, event.currentIndex);
    moveItemInArray(this.filteredSubmitGroupInSection, event.previousIndex, event.currentIndex);
  }

  //// Articles
  dropArticle(event: CdkDragDrop<string[]>, ix: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.getArticlesInSection(ix).value, event.previousIndex, event.currentIndex);
      moveItemInArray(this.getArticlesInSection(ix).controls, event.previousIndex, event.currentIndex);
      moveItemInArray(this.filteredArticlesInSection[ix], event.previousIndex, event.currentIndex);
      moveItemInArray(this.filteredSubmitGroupInSection[ix], event.previousIndex, event.currentIndex);

    } else {
      const currentSectionIndex = Number(event.container.data);
      const previousSectionIndex = Number(event.previousContainer.data);
      var movedItem = this.getArticlesInSection(previousSectionIndex).at(event.previousIndex);
      this.getArticlesInSection(previousSectionIndex).removeAt(event.previousIndex);
      this.getArticlesInSection(currentSectionIndex).insert(event.currentIndex, movedItem);
      transferArrayItem(this.filteredArticlesInSection[previousSectionIndex],
        this.filteredArticlesInSection[currentSectionIndex],
        event.previousIndex,
        event.currentIndex);
      transferArrayItem(this.filteredSubmitGroupInSection[previousSectionIndex],
        this.filteredSubmitGroupInSection[currentSectionIndex],
        event.previousIndex,
        event.currentIndex);
    }
  }

  getConnectedList(): any[] {
    return this.devisForm.value["section"].map(x => `${x.id}`);
  }

  // DB

  getArticles() {
    this.articleService.getAll()
      .subscribe(
        data => {
          this.articles = data;
          // Used in dev, should be removed
          // console.log(data);
          this.getSubmitGroups();
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
            map(name => name ? this._filterCustomer(name) : this.customers.slice()));
        },
        error => {
          console.log(error);
        });
  }

  getMarketTypes() {
    this.marketTypeService.getAll()
      .subscribe(
        data => {
          this.marketType = data;
        },
        error => {
          console.log(error);
        });
  }

  getSubmitGroups() {
    this.submitGroupService.getAll()
      .subscribe(
        data => {
          this.submitGroup = data;
          // Je devrais surement pas fiare comme ça, 
          //mais j'aimerai bien ajouter une section une fois que
          // les articles on été recuperer maisj e sais pas comment fiare
          //poru attendre que la focntion ait ifini autrement uqe comme ça 
          this.addSection();
        },
        error => {
          console.log(error);
        });
  }


  getCities() {
    this.cityService.getAll()
      .subscribe(
        data => {
          this.cities = data;
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
}