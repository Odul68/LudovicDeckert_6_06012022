
import data from "./data.js"

const urlId = new URL(window.location.href);
console.log(urlId.searchParams.get("id")); 


/**
 IF media 'photographerId' === urlId 
THEN => select media ID and show informations
 */


// Photographer information - filter photographer id with wht url id 

let photographerInfo = data.photographers.filter((photographers)=>{return photographers.id === Number (urlId.searchParams.get("id"))})
console.log(photographerInfo)

const displayPhotographerInfo = (photographerInfo) => {
    const infoContainer = document.getElementById("photographerInfo");
    infoContainer.innerHTML = "";
    for(let photographer of photographerInfo) {
        const element = document.createElement("section");
        element.innerHTML = `
        <div class="photographerInfo">
            <h1 class="photographerTitle">${photographer.name}</h1>
            <p class="photographerLocation">${photographer.city}, ${photographer.country}</p> 
            <p class="photographerTagLine">${photographer.tagline}</p> 
        </div>
        <a class="contactButton" href="#">Contactez-moi</a>
        <img src="assets/photographer_id/${photographer.portrait}" class ="photoId"/>
        `;
        infoContainer.appendChild(element);
    }
};

displayPhotographerInfo(photographerInfo);


// Dropdown button function


document.getElementById("myBtn").onclick = function() {myFunction()};

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
    

// modal opening and closing - to finish with errors


const modalbg = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".contactButton");
const modalCross = document.getElementsByClassName("closeModal");

const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const eMail = document.getElementById("email");

const firstNameFormData = document.getElementById("firstName");
const lastNameFormData = document.getElementById("lastName");
const eMailFormData = document.getElementById("eMail");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal anywhere on the page
window.onclick = function (event) {
  if (event.target == modalbg) {
    modalbg.style.display = "none";
  }
};

// Close modal on X spot - function
function closeModal() {
  modalbg.style.display = "none";
}

// Close modal on X spot - event
modalCross[0].addEventListener("click", closeModal);

// Onclick form validation and PreventDefault
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});


// Media list - One const for IMAGES ; One const for VIDEOS 


let images = data.media.filter((media)=>{return media.photographerId === Number (urlId.searchParams.get("id"))})
console.log(media)

const generateImage = image => {
  return`
    <div class="presentation">
      <img src="assets/images/${image.image}" class="photographerWork"/>
        <footer class="photographerWorkInfo">
          <p class="imagesName">${image.title}</p>
          <p class="imagesLikes">${image.likes}<i class="fas fa-heart"></i></p>
        </footer>
    </div>`;} 

 const generateVideo = image => {
  return`
    <div class="presentation">
      <video controls autoplay class="photographerWork">
        <source src="assets/images/${image.video}" type="video/mp4">
      </video>
        <footer class="photographerWorkInfo">
          <p class="imagesName">${image.title}</p>
          <p class="imagesLikes">${image.likes}<i class="fas fa-heart"></i></p>
        </footer>
    </div>`;} 


const displayMedia = (images) => {
    const mediaContainer = document.getElementById("media");
    mediaContainer.innerHTML = "";
    for(let image of images) {
        const element = document.createElement("div");
        element.innerHTML = image.hasOwnProperty('image') ? generateImage(image) : generateVideo(image)
        mediaContainer.appendChild(element);
      }


};

displayMedia(images); 
