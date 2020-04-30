import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
import { SubmitGroupService } from 'src/app/services/submit-group.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article = null;
  message = '';

  services = this.statusService.getAll();
  submit_group = this.submitGroupService.getAll();
  items = this.itemService.getAll();

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private statusService: StatusService,
    private submitGroupService: SubmitGroupService,
    private itemService: ItemService) { }

  ngOnInit() {
    this.message = '';
    this.getArticle(this.route.snapshot.paramMap.get('id'));
  }

  getArticle(id) {
    this.articleService.get(id)
      .subscribe(
        data => {
          this.article = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateArticle() {
    this.articleService.update(this.article.id, this.article)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/articles']);
        },
        error => {
          console.log(error);
        });
  }

  deleteArticle() {
    this.articleService.delete(this.article.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/articles']);
        },
        error => {
          console.log(error);
        });
  }
}
