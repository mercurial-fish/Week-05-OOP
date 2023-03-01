class Book {
    constructor(name, author, numberOfPages) {
        this.bookName = bookName;
        this.author = author;
        this.numberOfPages = numberOfPages;
    }

    describe() {
        return `This ${this.bookName} was written by ${this.author} and it has ${this.numberOfPages} pages.`;
    }
};

class Genre {
    constructor(name) {
        this.genreName = genreName;
        this.books = [];
    }
    addBook(bookName) {
        if (bookName instanceof Book) {
            this.genre.push(bookName);
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
                case "5":
                    this.displayAllBooks();
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
        4) Display All Genres
        5) Display All Books`);
    }

    showGenreMenuOptions (genreInfo) {
        return prompt (`
        0) back
        2) Add Book
        3) Remove Book
        ----------------------
        ${genreInfo}`
        );
    }

    addGenre() {
        let genre = prompt("Enter name for genre you want to add:");
        this.genres.push(new Genre(genre));
        console.log(genre);
        console.log("Printing from addGenre method", this.genres)
    }

    viewGenre() {
        let genreIndex = prompt ("Enter the index of the genre you wish to view:");
        if (genreIndex > -1 && genreIndex < this.genres.length) {
            this.selectedGenre = this.genres[genreIndex];
            let description = this.selectedGenre.name + "\n";

            for (let i = 0; i < this.selectedGenre.books.length; i++) {
                description += i + ') ' + '"' + this.selectedGenre.books[i].bookName + '" - ' +  
                this.selectedGenre.books[i].author + "\n";
            }
        }
    }
}
