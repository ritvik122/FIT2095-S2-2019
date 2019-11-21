import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  numberOfBooks = 0;
  numberOfHardCover = 0;
  booksDB = [];
  BookTitle = '';
  PublicationDate = '';
  BookType = '';
  BookSummary = '';
  BookToBeDeleted = 0;

  // Function to decrease the number of books
  decNoOfBooks() {
    if (this.numberOfBooks > 0) {
      this.numberOfBooks--;
    }
  }

  // Function to increment the number of books with hard cover
  incNoOfBooksWithHardCover() {
    this.numberOfHardCover++;
  }

  // Function to delete books with hard cover
  deleteBooksWithHardCover() {
    let numberOfHardCoverBooks = 0;
    for (let i = 0; i < this.booksDB.length; i++) {
      if (this.booksDB[i].BookType === 'Hard Cover') {
        numberOfHardCoverBooks++;
      }
    }
    for (let j = 0; j < numberOfHardCoverBooks; j++) {
      for (let i = 0; i < this.booksDB.length; i++) {
        if (this.booksDB[i].BookType === 'Hard Cover') {
          this.booksDB.splice(i, 1);
          this.decNoOfBooks();
        }
      }
    }
    this.numberOfHardCover = 0;
  }

  // Function to delete the book
  DeleteBook(value: string) {
    let indexOfTheBookToDeleted = parseInt(value, 10);
    for (let i = 0; i < this.booksDB.length; i++) {
      if (i === indexOfTheBookToDeleted) {
        indexOfTheBookToDeleted = 0;
        this.decNoOfBooks();
        if (this.booksDB[i].BookType === 'Hard Cover') {
          this.numberOfHardCover--;
        }
        this.booksDB.splice(i, 1);
      }
    }
  }

  // Function to save the book in the database
  saveBook() {

    if (this.BookType === 'Hard Cover') {
      this.numberOfHardCover++;
    }
    this.numberOfBooks++;
    this.booksDB.push({
      BookTitle: this.BookTitle,
      PublicationDate: this.PublicationDate,
      BookType: this.BookType,
      BookSummary: this.BookSummary
    });

    // Resetting the values of the global variables
    this.BookTitle = '';
    this.BookType = '';
    this.BookSummary = '';
  }

}
