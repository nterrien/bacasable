import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { VolumeService } from 'src/app/services/volume.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  volumes: any;
  label = ''; //For the research function
  searchDescription= true; //For the research function

  constructor(private articleService: ArticleService, private volumeService: VolumeService) { }

  ngOnInit() {
    this.getVolumeWithArticle();
  }

  refreshList() {
    this.getVolumeWithArticle();
  }

  searchLabel() {
    this.volumeService.findByLabel(this.label,this.searchDescription)
      .subscribe(
        data => {
          this.volumes = data;
          // Used in dev, should be removed
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteArticle(id: number) {
    this.articleService.delete(id)
      .subscribe(
        response => {
          // Used in dev, should be removed
          //  console.log(response);
          this.refreshList()
        },
        error => {
          console.log(error);
        });
  }

  getVolumeWithArticle() {
    this.volumeService.getAllwithArticles()
      .subscribe(
        data => {
          this.volumes = data;
          // Used in dev, should be removed
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
