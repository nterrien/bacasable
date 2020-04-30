import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleSingleComponent } from './components/article-single/article-single.component';

@NgModule({
  declarations: [
    AppComponent,
    AddArticleComponent,
    ArticleEditComponent,
    ArticlesListComponent,
    ArticleSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
