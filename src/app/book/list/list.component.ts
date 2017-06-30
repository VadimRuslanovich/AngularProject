import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from "@angular/http";
import { NgForm, FormControl } from '@angular/forms';

import { PagerService } from '../pager.service'

import { Book } from '../book';
import { BookService } from '../book.service';

const pageSize = 3;

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

  pager: any = {};
  currentPage: number = 1;
  totalItems: number;

  tempChecker: string = "all";

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
    if(queryParams["sort"]){
      return this.bookService.sortBooks(queryParams["sort"], "asc");
    }
    else if (queryParams["title"] || queryParams["author"] || queryParams["date"]) {
      return this.filterBooks({
          title: queryParams["title"] || "",
          author: queryParams["author"] || "",
          date: queryParams["date"] || ""
        },
        this.currentPage * pageSize - pageSize,
        pageSize);
    } else {
      return this.bookService.sliceBooks(this.currentPage * pageSize - pageSize, pageSize);
    }
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
      return;
    }
    this.pager = this.pagerService.getPager(this.totalItems, page);
    if(this.books.length <= 0) {
      this.error = "Nothing found";
      return;
    }
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

  filterBooks(filter: any, start: number, limit: number) {
    let properties:string[] = [], values:string[] = [];
    if (filter.title != null && filter.title != "" && filter.title != this.tempChecker) {
      properties.push("title");
      values.push(filter.title);
    }
    if (filter.author != null && filter.author != "" && filter.author != this.tempChecker) {
      properties.push("author");
      values.push(filter.author);
    }
    if (filter.date != null && filter.date != "" && filter.date != this.tempChecker) {
      properties.push("date");
      values.push(filter.date);
    }

    return this.bookService.filterBooks(properties, values, start, limit);
  }

  sortBooks(sort: string, order: string) {
    order == "desc" ? null : order = "asc";

    return this.bookService.sortBooks(sort, order);
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  gotoDetail(): void {
    this.router.navigate(['books', this.selectedBook.id]);
  }
}
