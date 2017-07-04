import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListComponent } from '../app/book/list/list.component';
import { CreateComponent } from '../app/book/create/create.component';
import { DetailsComponent } from '../app/book/details/details.component';

import { BookService } from '../app/book/book.service';
import { PagerService } from '../app/book/pager.service';
import { BookDataResolveService } from '../app/book/book-data-resolve.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    BookService,
    PagerService,
    BookDataResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
