var addBookBtn = document.getElementById("add-book-btn");
addBookBtn.addEventListener("click", e => {
    addBook(e);
});

function addBook(e) {
    // Disable button while the add book request is being processed
    e.target.classList.add("is-loading");
    var book_label = document.getElementById("book-label").value;
    var book_title = document.getElementById("book-title").value;
    var category = document.getElementById("category").value;
    var author = document.getElementById("author-name").value;
    // Add user to table
    dbBook.addBook(book_label, book_title, category, author);
    // clear the input boxes
    document.getElementById("book-title").value = "";
    document.getElementById("book-label").value = "";
    document.getElementById("category").value = "";
    document.getElementById("author-name").value = "";
    e.target.classList.remove("is-loading");
    alert("Book added successfully!");
}
