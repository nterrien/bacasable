import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { VolumeService } from 'src/app/services/volume.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  // articles: any;
  volumes: any;

  label = ''; //For the research function

  constructor(private articleService: ArticleService, private volumeService: VolumeService) { }

  ngOnInit() {
    // this.retrieveArticles();
    this.getVolumeWithArticle();
  }

  // retrieveArticles() {
  //   this.articleService.getAllwithAllJoinTable()
  //     .subscribe(
  //       data => {
  //         this.articles = data;
  //         // Used in dev, should be removed
  //         //  console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  refreshList() {
    // this.retrieveArticles();
    this.getVolumeWithArticle();
  }

  // searchLabel() {
  //   this.articleService.findByLabel(this.label) // Ça affiche pas bien les status, c'est car il va falloir que je fusionne la recherche complete (entendre avec les jointures) et la recherche par label
  //     .subscribe(
  //       data => {
  //         this.articles = data;
  //         // Used in dev, should be removed
  //         // console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

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
          // this.deleteUnusedItem();
          // console.log(this.volumes);
        },
        error => {
          console.log(error);
        });
  }

  // Does not work
  deleteUnusedItem() {
    // It is not necessary to keep item with no articles/ section with no item / volume with no section
    // This function might not be in the right place
    for (const volume in this.volumes) {
      console.log(this.volumes[volume])
      if (this.volumes[volume].sections.length == 0) {
        for (const section in this.volumes[volume].sections) {
          if (this.volumes[volume].sections[section].items.length == 0) {
            for (const item in this.volumes[volume].sections[section].items) {
              if (this.volumes[volume].sections[section].items[item].articles.length == 0) {
                delete this.volumes[volume].sections[section].items[item]
                console.log(this.volumes[volume].sections[section])
              }
            }
          }
          else {
            delete this.volumes[volume].sections[section]
          }
        }
      }
      else {
        delete this.volumes[volume]
      }
    }
  }

}
