function showRelevantEntries() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("directoryList");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            //li[i].style.visibility = "visible";
        } else {
            li[i].style.display = "none";
        }
    }
}

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", showRelevantEntries);

var accordions = document.getElementsByClassName("accordion");

for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function() {
    this.classList.toggle('is-open');

    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      // accordion is currently open, so close it
      content.style.maxHeight = null;
    } else {
      // accordion is currently closed, so open it
      content.style.maxHeight = content.scrollHeight + 100 + "px";
    }
  }
}

// var accordions = bulmaAccordion.attach(); // accordions now contains an array of all Accordion instances
//
// var coll = document.getElementsByClassName("collapsible");
// var i;
//
// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     console.log("hi");
//     var collapsible-content = this.nextElementSibling;
//     if (collapsible-content.style.maxHeight){
//       collapsible-content.style.maxHeight = null;
//     } else {
//       collapsible-content.style.maxHeight = content.scrollHeight + "px";
//     }
//   });
// }
