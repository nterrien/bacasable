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
  statuses: any;
  submit_group: any;
  items: any;

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
    this.retrieveChoices();
  }


  retrieveChoices() {
    this.retrieveStatuses();
    this.retrieveItems();
    this.retrieveSubmitGroups();
  }

  retrieveStatuses() {
    this.statusService.getAll()
      .subscribe(
        data => {
          this.statuses = data;
          // Used in dev, should be removed
          //console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveItems() {
    this.itemService.getAll()
      .subscribe(
        data => {
          this.items = data;
          // Used in dev, should be removed
          //console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveSubmitGroups() {
    this.submitGroupService.getAll()
      .subscribe(
        data => {
          this.submit_group = data;
          // Used in dev, should be removed
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getArticle(id) {
    this.articleService.get(id)
      .subscribe(
        data => {
          this.article = data;
          // Used in dev, should be removed
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateArticle() {

    this.article.id_submit == "null" ? this.article.id_submit = null : this.article.id_submit = this.article.id_submit
    this.articleService.update(this.article.id, this.article)
      .subscribe(
        response => {
          // Used in dev, should be removed
          //console.log(response);
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
          // Used in dev, should be removed
          //console.log(response);
          this.router.navigate(['/articles']);
        },
        error => {
          console.log(error);
        });
  }
}
