import { Component, OnInit, Input } from '@angular/core';
import { ArticlesListComponent } from '../articles-list/articles-list.component';

@Component({
  selector: 'app-article-single',
  templateUrl: './article-single.component.html',
  styleUrls: ['./article-single.component.css']
})
export class ArticleSingleComponent implements OnInit {

  constructor(private articleList: ArticlesListComponent) { }

  @Input() article;

  ngOnInit(): void {
  }

  deleteArticle() {
    this.articleList.deleteArticle(this.article.id)
  } 

  getStatus(article: any) {
    return this.articleList.getStatus(article)
  }

  getSubmitGroup(article: any) {
    return this.articleList.getSubmitGroup(article)
  }

}
