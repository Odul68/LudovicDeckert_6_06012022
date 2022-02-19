
import data from "../data.js"

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
        element.classList.add() /* to choose and modify css */
        element.innerHTML = `
        <div class="photographerInfo">
            <h1 class="photographerTitle">${photographer.name}</h1>
            <p class="photographerLocation">${photographer.city}, ${photographer.country}</p> 
            <p class="photographerTagLine">${photographer.tagline}</p> 
        </div>
        <a class="contactButton" href="#">Contactez-moi</a>
        <img src="/assets/photographer_id/${photographer.portrait}" class ="photoId"/>
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
const message = document.getElementById("message");

const firstNameFormData = document.getElementById("firstName");
const lastNameFormData = document.getElementById("lastName");
const eMailFormData = document.getElementById("eMail");
const messageFormData = document.getElementById("Message");
const confirmation = document.getElementById("confirmation");

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

function validate() {
  let firstChecked;
  let lastChecked;
  let mailChecked;
  let messageChecked;


  if (
    !firstName.value.match("^[a-z A-Z]*$", "g") ||
    firstName.value == " " ||
    firstName.value == null ||
    firstName.value.length < 2
  ) {
    firstNameFormData.setAttribute("data-error-visible", true);
    firstNameFormData.setAttribute(
      "data-error",
      "Veuillez entrer deux caractères minimum"
    );
  } else {
    firstNameFormData.setAttribute("data-error-visible", false);
    firstNameFormData.setAttribute("data-error", "");
    firstChecked = true;
  }

  if (
    !lastName.value.match("^[a-z A-Z]*$", "g") ||
    lastName.value == " " ||
    lastName.value == null ||
    lastName.value.length < 2
  ) {
    lastNameFormData.setAttribute("data-error-visible", true);
    lastNameFormData.setAttribute(
      "data-error",
      "Veuillez entrer deux caractères minimum"
    );
  } else {
    lastNameFormData.setAttribute("data-error-visible", false);
    lastNameFormData.setAttribute("data-error", "");
    lastChecked = true;
  }

  if (
    !/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(
      eMail.value
    )
  ) {
    eMailFormData.setAttribute("data-error-visible", true);
    eMailFormData.setAttribute(
      "data-error",
      "Veuillez entrer une adresse email valide"
    );
  } else {
    eMailFormData.setAttribute("data-error-visible", false);
    eMailFormData.setAttribute("data-error", "");
    mailChecked = true;
  }

  if (
    message.value == '' ||
    message.value.length < 2
  ) {
    messageFormData.setAttribute("data-error-visible", true);
    messageFormData.setAttribute(
      "data-error",
      "Veuillez entrer votre message."
    );
  } else {
    messageFormData.setAttribute("data-error-visible", false);
    messageFormData.setAttribute("data-error", "");
    messageChecked = true;
  }

  // Confirmation message when sent
  if (
    firstChecked === true &&
    lastChecked === true &&
    mailChecked === true &&
    messageChecked === true
  ) {
    form.style.display = "None";
    confirmation.innerText = "Merci ! Votre réservation a été reçue";
    confirmation.style.fontSize = "1.8rem";
    confirmation.style.color = "white";
  }
}


// Media list - One const for IMAGES ; One const for VIDEOS 


let medias = data.media.filter((media)=>{return media.photographerId === Number (urlId.searchParams.get("id"))})
console.log(medias)
/** 
const lightbox = document.createElement('div');
lightbox.id = 'lightbox'

const generateLightbox = (initMedia, photographerMedia) => {
  console.log({photographerMedia})
  generateLightbox.innerHTML = `
<button class="lightboxClose">Fermer</button>
<button class="lightboxNext">Suivant</button>
<button class="lightboxPrevious">Précédent</button>
<div class="lightboxContainer">
<img src="/assets/images/${initMedia.image}" class="photographerWork"/>
<div>
`;

document.body.appendChild(lightbox)


lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
})

} 
*/

const generateImage = media => {
  return`
    <div class="presentation">
      <img src="/assets/images/${media.image}" class="photographerWork"/>
        <footer class="photographerWorkInfo">
          <p class="imagesName">${media.title}</p>
          <p class="imagesLikes">${media.likes}<i class="fas fa-heart"></i></p>
        </footer>
    </div>`;} 

 const generateVideo = media => {
  return`
    <div class="presentation">
      <video controls autoplay class="photographerWork">
        <source src="/assets/images/${media.video}" type="video/mp4">
      </video>
        <footer class="photographerWorkInfo">
          <p class="imagesName">${media.title}</p>
          <p id="clicks"class="imagesLikes">${media.likes}<i class="fas fa-heart"></i></p>
        </footer>
    </div>`;} 









const displayMedia = (medias) => {
    const mediaContainer = document.getElementById("media");
    mediaContainer.innerHTML = "";
    for(let media of medias) {
        const element = document.createElement("div");
        element.innerHTML = media.hasOwnProperty('image') ? generateImage(media) : generateVideo(media)
      /** 
      element.addEventListener('click', () => {

        generateLightbox(media)
        lightbox.classList.add('active');

        const nextMediaId = medias.findIndex(item => item.id === media.id) +1; 
        const previousMediaId = medias.findIndex(item => item.id === media.id) -1;

        const nextButton = document.querySelector('.lightboxNext');
        const previousButton = document.querySelector('.lightboxPrevious');

        const container = document.querySelector('.lightboxContainer');

        nextButton.addEventListener('click', _ => {
          if (media.type === "")
          container.innerHTML = "";
          container.innerHTML = `<div class="lightboxContainer">
          <img src="assets/images/${medias[nextMediaId].image}" class="photographerWork"/>
          </div>`       
         })
      })
      */


        mediaContainer.appendChild(element);
      }


};

displayMedia(medias); 


// Lightbox 
/** 

const lightbox = document.createElement('div');
lightbox.id = 'lightbox'
document.body.appendChild(lightbox);

const images = document.querySelectorAll('img');
images.forEach(image => {
  image.addEventListener('click', e => {
    lightbox.classList.add('active')
    const img = document.createElement('img')
    img.src = image.src
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)
  })
})

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
})
*/










/** 
const lightboxbg = document.querySelector(".lightbox");
const lightboxCross = document.getElementsByClassName("lightboxClose");
const images = document.querySelectorAll('img');
images.forEach((btn) => btn.addEventListener("click", launchLightbox));
function launchLightbox() {
  lightboxbg.style.display = "block";
}
window.onclick = function (event) {
  if (event.target == lightboxbg) {
    lightboxbg.style.display = "none";
  }
};
function lightboxClose() {
  lightboxbg.style.display = "none";
}
lightboxCross[0].addEventListener("click", lightboxClose);
*/


