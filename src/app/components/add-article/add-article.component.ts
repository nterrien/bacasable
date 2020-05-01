import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
import { SubmitGroupService } from 'src/app/services/submit-group.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  article = {
    label: '',
    description: ' ',
    comment: ' ',
    unit: ' ',
    minimal_quantity: 0.0,
    price: 0.0,
    percent_workforce: 0.0,
    subcontractable: false,
    up_to_date: true,
    id_submit: null,
    id_item: 1,
    status: 1
  };

  statuses : any;
  submit_group = this.submitGroupService.getAll();
  items = this.itemService.getAll();

  constructor(private articleService: ArticleService,
    private router: Router,
    private statusService: StatusService,
    private submitGroupService: SubmitGroupService,
    private itemService: ItemService) { }

  ngOnInit() {

    this.retrieveChoices();
  }

  retrieveChoices() {
     this.retrieveStatuses();
    // this.retrieveItems();
    // this.retrieveSubmitGroups();
  }

  retrieveStatuses() {
    this.statusService.getAll()
    .subscribe(
      data => {
        this.statuses = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  // retrieveItems() {
  //   this.itemService.getAll()
  //     .subscribe(
  //       data => {
  //         this.items = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // retrieveSubmitGroups() {
  //   this.submitGroupService.getAll()
  //     .subscribe(
  //       data => {
  //         this.submit_group = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  saveArticle() {
    const data = {
      label: this.article.label,
      description: this.article.description,
      comment: this.article.comment,
      unit: this.article.unit,
      minimal_quantity: this.article.minimal_quantity,
      price: this.article.price,
      percent_workforce: this.article.percent_workforce,
      subcontractable: this.article.subcontractable,
      up_to_date: this.article.up_to_date,
      id_submit: this.article.id_submit == "null" ? null : this.article.id_submit  ,
      id_item: this.article.id_item,
      status: this.article.status
    };
    this.articleService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/articles']);
        },
        error => {
          console.log(error);
        });

  }

  newArticle() {
    this.article = {
      label: '',
      description: ' ',
      comment: ' ',
      unit: ' ',
      minimal_quantity: .0,
      price: 0.0,
      percent_workforce: 0.0,
      subcontractable: false,
      up_to_date: true,
      id_submit: null,
      id_item: 1,
      status: 1
    };
  }
}
