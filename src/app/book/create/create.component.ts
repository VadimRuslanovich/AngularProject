import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectedRegion: number = 1;
  dateNow = new Date();

  constructor(private bookService:BookService,
              private location: Location){}

  add(form:NgForm): void {
    if(form.invalid)
      return;
    
    let book: Book = new Book(
      form.controls['title'].value,
      form.controls['author'].value,
      form.controls['date'].value,
      form.controls['description'].value,
      form.controls['issued'].value,
      form.controls.hasOwnProperty('region_one') ? form.controls['region_one'].value
        : form.controls.hasOwnProperty('region_two_1') && form.controls.hasOwnProperty('region_two_2')
        ? (`${form.controls['region_two_1'].value} ${form.controls['region_two_2'].value}`) : "");

    this.bookService.createBook(book)
      .subscribe(() =>
          this.location.back(),
        error => this.bookService.handleError(error));
  }

  ngOnInit() {
  }
}
