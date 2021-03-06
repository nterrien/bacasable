import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { DevisComponent } from './devis/devis.component';

const routes: Routes = [
  { path: '', redirectTo: 'devis', pathMatch: 'full' },
  { path: 'devis', component: DevisComponent},
  { path: 'articles', component: ArticlesListComponent },
  { path: 'articles/add', component: AddArticleComponent },
  { path: 'articles/:id', component: ArticleEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
