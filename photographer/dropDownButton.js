import data from "../data.js"

const urlId = new URL(window.location.href);
console.log(urlId.searchParams.get("id")); 

document.getElementById("myBtn").onclick = function() {myFunction()};

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
let medias = data.media.filter((media)=>{return media.photographerId === Number (urlId.searchParams.get("id"))})
medias.sort((a,b) => a.likes - b.likes);
console.log(medias);

/**
medias.sort(function(x, y){
  let a = x.title.toUpperCase(),
      b = y.title.toUpperCase();
  return a == b ? 0 : a > b ? 1 : -1;
}); */

/** 
medias.sort(function (x,y){
  let a = new Date(x.date),
      b = new Date(y.date);
  return a - b;
});*/