class Book {
    constructor(bookName, author, numberOfPages) {
        this.bookName = bookName;
        this.author = author;
        this.numberOfPages = numberOfPages;
    }

    describe() {
        return `This ${this.bookName} was written by ${this.author} and it has ${this.numberOfPages} pages.`;
    }
};

class Genre {
    constructor(genreName) {
        this.genreName = genreName;
        this.books = [];
    }
    addBook(bookName) {
        if (bookName instanceof Book) {
            this.books.push(bookName);
        } else {
            throw new Error(`You can only add an instance of a book`);
            //this is in here as a way to handle exceptions and prevents code from crashing
        }
    }
    describe() {
        return `${this.genreName} has ${this.books.length} books.`;
    }
};

class ReadingListMenu {
    constructor() {
        this.genres = [];
        this.selectedGenre = null;
    }

    start() {
        let readingSelection = this.showReadingMenuOptions();

        while (readingSelection != 0) {
            switch (readingSelection) {
                case "1":
                    this.addGenre();
                    break;
                case "2":
                    this.viewGenre();
                    break;
                case "3":
                    this.removeGenre();
                    break;
                case "4":
                    this.displayGenres();
                    break;
                default:
                    readingSelection = 0;

            }
            readingSelection = this.showReadingMenuOptions();
        }
        alert("Happy Reading!");
    }

    showReadingMenuOptions() {
        return prompt (`
        Welcome to Your Reading List!
        Please select one of the options
        below to begin making your
        Personal Reading List:
        
        0) Exit
        1) Add Genre
        2) View Genre
        3) Remove Genre
        4) Display All Genres`);
    }

    showGenreMenuOptions (genreInfo) {
        return prompt (`
        0) back
        1) Add Book
        2) Remove Book
        ----------------------
        ${genreInfo}`
        );
    }

    addGenre() {
        let name = prompt("Enter name for genre you want to add:");
        this.genres.push(new Genre(name));
        alert("Great choice!");
    };

    viewGenre() {
        alert("Hmmm which one will you choose today? Let's see shall we?!");
        let genreIndex = prompt ("Enter the index of the genre you wish to view:");
        if (genreIndex > -1 && genreIndex < this.genres.length) {
            this.selectedGenre = this.genres[genreIndex];
            let description = this.selectedGenre.genreName + "\n";

            for (let i = 0; i < this.selectedGenre.books.length; i++) {
                description += i + ') ' + '"' + this.selectedGenre.books[i].bookName + '" - ' +  
                this.selectedGenre.books[i].author + ", " + this.selectedGenre.books[i].numberOfPages + " pages" + "\n";
               
            }

            let genreSelection = this.showGenreMenuOptions(description);
            switch (genreSelection) {
                case "1":
                    this.nameBook();
                    break;
                case "2":
                    this.removeBook();
                    break;

            };
            
        }

    };
    removeGenre() {
        let genreIndex = prompt("Enter the index of the genre you wish to remove:");
        if (genreIndex > -1 && genreIndex < this.genres.length) {
            this.genres.splice(genreIndex, 1);
        }
        alert("No, it's fine. *wipes away tears* I didn't even like that one anyway.");
    };
    displayGenres() {
        alert("Prepare to be dazzled!");
        alert("Did you do it? Did you prepare? Ok good. Now I'll show you.");
        let genreString = "";
        for (let i = 0; i < this.genres.length; i++) {
            genreString += i + ") " + this.genres[i].genreName + "\n";
           
        }

        alert(genreString);
    };

    nameBook() {
        let bookName = prompt("Enter the title of the book you want to add:");
        let author = prompt("Enter the name of the author:");
        let numberOfPages = prompt("Enter the number of pages in the book:");
        this.selectedGenre.books.push(new Book(bookName, author, numberOfPages));
        alert("Ooooh! I love that one!");
    };

    removeBook() {
        let bookIndex = prompt("Enter the index of the book you wish to remove:");
        if (bookIndex > -1 && bookIndex < this.selectedGenre.books.length) {
            this.selectedGenre.books.splice(bookIndex, 1);
        }
        alert("Awww man! But why?! Well... if you're sure...");
    }
}

let readingListMenu = new ReadingListMenu();
readingListMenu.start();
