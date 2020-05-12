import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material.module';
import { DevisComponent } from './devis/devis.component'
import { AddCustomerComponent } from './devis/add-customer';


@NgModule({
  declarations: [
    AppComponent,
    AddArticleComponent,
    ArticleEditComponent,
    ArticlesListComponent,
    DevisComponent,
    AddCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
