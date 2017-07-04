import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  ) { }

  ngOnInit() {
    this.book = this.route.snapshot.data['book'].json();
  }

  save(form:NgForm) {
    if(form.invalid)
      return;

    this.bookService.updateBook(this.book);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }
}
