import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  book: Book;
  dateNow = new Date();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.bookService.getBook(+params['id']))
      .subscribe(book => {
        var ololo = book.json();
        this.book = book.json();
      });
  }

  save() {
    this.bookService.updateBook(this.book);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }
}
