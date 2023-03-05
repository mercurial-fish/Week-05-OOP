//My menu is going to be a reading list. It will give the user prompts to add genres and add books
// to those genres.

//The first class I am creating is called "Book". It will consist of three things: the name of the book,
//the author, and the number of pages. I have created a describe method within the class to describe
//the book.


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

// The next class I have created is Genre. In it I have created a books array that each new book entry will
// be added to. The "If...else" conditional will ensure that new books get pushed to the array and if something
//other than a book is added, an error will be thrown.

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

//The third class I created is the Reading List Menu. This utilizes the two previous classes and sets
// everything up.
class ReadingListMenu {
    constructor() {
        this.genres = [];
        this.selectedGenre = null;
    }
// Here I have created the start method that will be called on later. It calls on the 
// showReadingMenuOptions method and has it equal to the readingSelection. Each case in the while loop
// references a method created later in the code.
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
            // Calling on readingSelection = this.showReadingMenuOptions() for the second time, outside
            // of the loop ensures that after a selection has been made and input has been given, it will 
            //return back to the reading menu prompt.
        }

        alert("Happy Reading!");
    }//I've changed the alert to something more in line with the spirit of my menu.

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
        `);
        //this method creates the prompt that was referenced above
    }

    showGenreMenuOptions (genreInfo) {
        return prompt (`
        0) back
        1) Add Book
        2) Remove Book
        ----------------------
        ${genreInfo}`
        );
    } //This creates a prompt that will appear after viewGenre is called.

    addGenre() {
        let name = prompt("Enter name for genre you want to add:");
        this.genres.push(new Genre(name));
        alert("Great choice!");

        //this method includes a prompt for the user to input their genre choice. The input is then
        //pushed to the genres array created up at the top of the ReadingListMenu class. I have then set
        //an alert to tell the user "Great choice!" because I wanted to add some warmth and a little
        // pizzazz to my menu.
    };

    viewGenre() {
        alert("Hmmm which one will you choose today? Let's see shall we?!");
        let genreIndex = prompt ("Enter the index of the genre you wish to view:");
        if (genreIndex > -1 && genreIndex < this.genres.length) {
            this.selectedGenre = this.genres[genreIndex];
            let description = this.selectedGenre.genreName + "\n";
// This bit of code asks for the user to input the index of the genre they wish to view.
// As long as the index isn't less than 0 or greater than the length of the genres index, the
// selectedGenre (which we set to null earlier in the code) will equal the name of the genre associated
//to that index.
            for (let i = 0; i < this.selectedGenre.books.length; i++) {
                description += i + ') ' + '"' + this.selectedGenre.books[i].bookName + '" - ' +  
                this.selectedGenre.books[i].author + ", " + this.selectedGenre.books[i].numberOfPages + " pages" + "\n";
               
            }
            // For each book that has been added to the selected genre, it will print out the book's index,
            // it's name, the author and the number of pages under the selected genre

            let genreSelection = this.showGenreMenuOptions(description);
            switch (genreSelection) {
                case "1":
                    this.nameBook();
                    break;
                case "2":
                    this.removeBook();
                    break;

            };
            // creates the switch case for the genre menu
            
        }

    };
    removeGenre() {
        let genreIndex = prompt("Enter the index of the genre you wish to remove:");
        if (genreIndex > -1 && genreIndex < this.genres.length) {
            this.genres.splice(genreIndex, 1);
        }
        alert("No, it's fine. *wipes away tears* I didn't even like that one anyway.");

        //prompts user to enter index of the genre they wish to remove and as long as the index is greater
        //than -1 and less than the array length, the genre will be spliced. The genre index tells the method
        //where and the number 1 says how many items are being removed.
    };
    displayGenres() {
        alert("Prepare to be dazzled!");
        alert("Did you do it? Did you prepare? Ok good. Now I'll show you.");
        let genreString = "";
        for (let i = 0; i < this.genres.length; i++) {
            genreString += i + ") " + this.genres[i].genreName + "\n";
           
        }
        //genreString is defined as a string with the double quotes with notthing in them. In the for loop,
        //it will return the index plus the genre name of that index and then a new line. And this will continue
        //for the length of the array.

        alert(genreString);
    };

    nameBook() {
        let bookName = prompt("Enter the title of the book you want to add:");
        let author = prompt("Enter the name of the author:");
        let numberOfPages = prompt("Enter the number of pages in the book:");
        this.selectedGenre.books.push(new Book(bookName, author, numberOfPages));
        alert("Ooooh! I love that one!");
    };
    //This prompts the user to enter the name, author and number of pages for their book. It then creates
    //a new Book under the Book class and pushes it to the books array within the selected genre.

    removeBook() {
        let bookIndex = prompt("Enter the index of the book you wish to remove:");
        if (bookIndex > -1 && bookIndex < this.selectedGenre.books.length) {
            this.selectedGenre.books.splice(bookIndex, 1);
        }
        alert("Awww man! But why?! Well... if you're sure...");
    }// works the same as the remove genre method above.
    
}

let readingListMenu = new ReadingListMenu();
readingListMenu.start();
