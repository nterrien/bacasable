import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { VolumeService } from 'src/app/services/volume.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles: any;
  // items: any;
  // sections: any;
  volumes: any;

  label = ''; //Pour la recherche

  constructor(private articleService: ArticleService, private volumeService: VolumeService) { }

  ngOnInit() {
    this.retrieveArticles();
    this.getVolumeWithArticle();
  }

  retrieveArticles() {
    this.articleService.getAll()
      .subscribe(
        data => {
          this.articles = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveArticles();
    this.getVolumeWithArticle();
  }

  searchLabel() {
    this.articleService.findByLabel(this.label)
      .subscribe(
        data => {
          this.articles = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteArticle(id: number) {
    this.articleService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList()
        },
        error => {
          console.log(error);
        });
  }

  getStatus(article: any) {
    return this.articleService.getStatus(article)
  }

  getSubmitGroup(article: any) {
    return this.articleService.getSubmitGroup(article)
  }

  // getItem(article: any) {
  //   return this.articleService.getItem(article)
  // }

  // getSection(article: any) {
  //   return this.articleService.getSection(article)
  // }

  // getVolume(article: any) {
  //   return this.articleService.getVolume(article)
  // }

  getVolumeWithArticle(){
    this.volumes = this.volumeService.getAllwithArticles()
  }

}
