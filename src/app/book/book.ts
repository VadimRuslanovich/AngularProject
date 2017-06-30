export class Book {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  issued: boolean;
  region: string;

  constructor(_title: string,
              _author: string,
              _date: string,
              _description: string,
              _issued: boolean,
              _region: string) {
  this.title = _title;
  this.author = _author;
  this.date = _date;
  this.description = _description;
  this.issued = _issued;
  this.region = _region;
}
}
