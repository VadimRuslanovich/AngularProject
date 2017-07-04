import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BookService } from './book.service';
import {Book} from "./book";

@Injectable()
export class BookDataResolveService implements Resolve<any> {

  constructor(private bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.bookService.getBook(route.params['id']);
  }
}
