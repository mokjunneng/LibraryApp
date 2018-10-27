function searchFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("search-bar-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("user-records-table");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < table.rows.length; i++) {
        name = table.rows[i].cells[0].innerHTML;
        // Can consider searching by IC
        if (name) {
            if (name.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        } 
    }
}   

input = document.getElementById("search-bar-input");
input.addEventListener("keyup", searchFunction);

