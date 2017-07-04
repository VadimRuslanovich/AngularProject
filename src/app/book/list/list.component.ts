import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from "@angular/http";
import { NgForm, FormControl } from '@angular/forms';

import { PagerService } from '../pager.service'

import { Book } from '../book';
import { BookService } from '../book.service';

const pageSize = 5;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  books:Book[] = [];
  selectedBook:Book;
  dateNow = new Date();

  error: string = "";
  sort: string = "";

  pager: any = {};
  currentPage: number = 1;
  totalItems: number;

  constructor(private router:Router,
              private route: ActivatedRoute,
              private bookService: BookService,
              private pagerService: PagerService) {
  }

  ngOnInit():void {
    this.getBooks();
  }

  check(queryParams:Params) {
    this.currentPage = +queryParams["page"] || 1;
    let properties:string[] = [], values:string[] = [];
    if (queryParams["title"] && queryParams["title"] != null && queryParams["title"] != "") {
      properties.push("title");
      values.push(queryParams["title"]);
    }
    if (queryParams["author"] && queryParams["author"] != null && queryParams["author"] != "") {
      properties.push("author");
      values.push(queryParams["author"]);
    }
    if (queryParams["date"] && queryParams["date"] != null && queryParams["date"] != "") {
      properties.push("date");
      values.push(queryParams["date"]);
    }
    return this.bookService.get(queryParams["sort"], "asc", properties, values, (this.currentPage * pageSize - pageSize), pageSize);
  }

  getBooks():void {
    this.route.queryParams
      .switchMap((params:Params) => this.check(params))
      .subscribe((data:Response) => {
          this.books = data.json() as Book[];
          this.totalItems = +data.headers.get('x-total-count');
          this.books.length > 0 ? this.setPage(this.currentPage) : this.setPage(0);
        },
        error => this.error = this.bookService.handleError(error));

  }

  setPage(page: number = 1): void {
    if (page < 1) {
      this.error = "Nothing found";
      return;
    }
    this.pager = this.pagerService.getPager(this.totalItems, page, pageSize);
    this.error = "";
  }

  delete(book:Book): void {
    var confirmation = confirm("Really delete?");
    if (confirmation) {
      this.bookService.deleteBook(book.id)
        .subscribe(() => {
          this.books = this.books.filter(h => h !== book);
          this.setPage(this.pager.currentPage);
          if (this.selectedBook === book) {
            this.selectedBook = null;
          }
        }, error => this.error = this.bookService.handleError(error));
    }
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  gotoDetail(): void {
    this.router.navigate(['books', this.selectedBook.id]);
  }
}
