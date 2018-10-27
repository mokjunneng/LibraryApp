function show(p1,p2) {
  document.getElementById(p1).style.display='block';
  document.getElementById(p2).style.display='none';
  return false;
}

var shown = document.getElementById("return-button");
shown.addEventListener("click", ()=> { show("Page2","Page1") });

var shown_one = document.getElementById("borrow-button");
shown_one.addEventListener("click", ()=> { show("Page1","Page2") });
