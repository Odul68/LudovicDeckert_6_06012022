
import data from "data.js"

const urlId = new URL(window.location.href);


// Media list - Get media from ID
let medias = data.media.filter((media)=>{return media.photographerId === Number (urlId.searchParams.get("id"))})


// to show the dropdown button


document.getElementById("myBtn").onclick = function() {myFunction()};
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("arrow").classList.toggle("active");
}

// dropdown button to sort by likes
const input = document.querySelector(".dropbtn");
// Sort by popularity (likes)
document.querySelector("#popularity").addEventListener("click", () =>{
  input.value = "Popularité";
  const sortMedias = medias.sort((a,b) => a.likes - b.likes);
  displayMedia(sortMedias);
})
// Sort by popularity when ENTER key pressed
document.querySelector("#popularity").addEventListener("keyup", (e) =>{
  e.preventDefault();
  if(e.keyCode === 13) {
    input.value = "Popularité";
    const sortMedias = medias.sort((a,b) => a.likes - b.likes);
    displayMedia(sortMedias);
  }  
})

// Sort by date 
document.querySelector("#date").addEventListener("click", () =>{
  input.value = "Date";
  const sortMedias = medias.sort(function (x,y){
    let a = new Date(x.date),
        b = new Date(y.date);
    return a - b;
  })
  displayMedia(sortMedias);
});
// Sort by date when ENTER key pressed
document.querySelector("#date").addEventListener("keyup", (e) =>{
  e.preventDefault();
  if(e.keyCode === 13) {
    input.value = "Date";
    const sortMedias = medias.sort(function (x,y){
      let a = new Date(x.date),
          b = new Date(y.date);
      return a - b;
    })
    displayMedia(sortMedias);
  } 
});

// Sort by title (alphabetical order)
document.querySelector("#title").addEventListener("click", () => {
  input.value = "Titre";
    const sortMedias = medias.sort(function(x, y){
      let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    })
    displayMedia(sortMedias);
}); 
// Sort by title (alphabetical order) when ENTER key pressed
document.querySelector("#title").addEventListener("keyup", (e) => {
  e.preventDefault();
  if(e.keyCode === 13) {
    input.value = "Titre";
    const sortMedias = medias.sort(function(x, y){
      let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    })
    displayMedia(sortMedias);
  }
}); 


// Create Div for medias : Images and Videos


const lightbox = document.createElement('div');
lightbox.id = 'lightbox'


const generateButtons = (media, medias) => { // Lightbox navigation 
  const lightboxContainer = document.querySelector(".lightboxContainer");
  const nextBtn = document.querySelector(".lightboxNext");
  const prevBtn = document.querySelector(".lightboxPrevious");
  const lastArrayMedia = medias.length - 1;
  let lightboxInitMediaIndex = medias.findIndex(item => item.id === media.id);


  // Previous Media on click "PrevBtn" => Arrow 
  prevBtn.addEventListener('click', () => {
    const prev = 
      lightboxInitMediaIndex
      ? lightboxInitMediaIndex - 1
      : lastArrayMedia;
    const mediaToDisplay = medias[prev].image 
    ? `<img src="/assets/images/${medias[prev].image}" class="photographerWork"/>`
    : `<video controls autoplay class="photographerWork">
    <source src="/assets/images/${medias[prev].video}" type="video/mp4">
    </video>`;
    lightboxContainer.innerHTML = `${mediaToDisplay}
    <p class="imagesNameLightbox">${medias[prev].title}</p>`;
    lightboxInitMediaIndex = prev;
      })
  // Previous Media on "Next" key pressed
  document.addEventListener('keyup',e => {
    e.preventDefault()
    if(e.keyCode === 37){
    const prev = 
      lightboxInitMediaIndex
      ? lightboxInitMediaIndex - 1
      : lastArrayMedia;
    const mediaToDisplay = medias[prev].image 
    ? `<img src="/assets/images/${medias[prev].image}" class="photographerWork"/>`
    : `<video controls autoplay class="photographerWork">
    <source src="/assets/images/${medias[prev].video}" type="video/mp4">
    </video>`;
    lightboxContainer.innerHTML = `${mediaToDisplay}
    <p class="imagesNameLightbox">${medias[prev].title}</p>`;
    lightboxInitMediaIndex = prev;
    };
  })      
  // Next Media on click "NextBtn" => Arrow       
  nextBtn.addEventListener('click', () => {
  const next = 
    lightboxInitMediaIndex === lastArrayMedia 
    ? 0 
    : lightboxInitMediaIndex + 1;
  const mediaToDisplay = medias[next].image 
  ? `<img src="/assets/images/${medias[next].image}" class="photographerWork"/>`     
  : `<video controls autoplay class="photographerWork">
  <source src="/assets/images/${medias[next].video}" type="video/mp4">
  </video>`;
  lightboxContainer.innerHTML =  `${mediaToDisplay}
  <p class="imagesNameLightbox">${medias[next].title}</p>`;
  lightboxInitMediaIndex = next;
  })
  // Next Media on "Previous" key pressed 
  document.addEventListener('keyup', e => {
    e.preventDefault();
    if(e.keyCode === 39) {
      const next = 
      lightboxInitMediaIndex === lastArrayMedia 
      ? 0 
      : lightboxInitMediaIndex + 1;
    const mediaToDisplay = medias[next].image 
    ? `<img src="/assets/images/${medias[next].image}" class="photographerWork"/>`     
    : `<video controls autoplay class="photographerWork">
    <source src="/assets/images/${medias[next].video}" type="video/mp4">
    </video>`;
    lightboxContainer.innerHTML =  `${mediaToDisplay}
    <p class="imagesNameLightbox">${medias[next].title}</p>`;
    lightboxInitMediaIndex = next;
    }
});
}


// Generate Lightbox depending on media


const generateLightbox = (media, medias) => {
  document.body.appendChild(lightbox)
  const mediaType = media.image // If media = image THEN image IF NOT THEN video
  ? `<img src="/assets/images/${media.image}" class="photographerWork"/>`     
  : `<video controls autoplay class="photographerWork">
  <source src="/assets/images/${media.video}" type="video/mp4">
  </video>`;
  lightbox.innerHTML = `
<button class="lightboxClose"></button>
<button class="lightboxNext"></button>
<button class="lightboxPrevious"></button>
<div class="lightboxContainer">
  ${mediaType}
   <p class="imagesNameLightbox">${media.title}</p>
<div>
`;
// close on X spot 
const closeBtn = document.querySelector(".lightboxClose");
closeBtn.addEventListener('click', () => {
  return lightbox.classList.remove('active')
})
// Close lightbox by pressing on the ESC key
document.addEventListener('keydown', function(e) {
  let keyCode = e.key;
  if (keyCode === "Escape") {
    lightbox.classList.remove('active');
  }});
generateButtons(media, medias);
} 


// one function per media type to get it from the data.js file 


function generateImage(media) {
  return `
    <div class="presentation">
      <img src="/assets/images/${media.image}" class="photographerWork" alt="${media.title}" tabindex="5"/>
        <footer class="photographerWorkInfo">
          <p class="imagesName">${media.title}</p>
          <div class="likesCounter">
          <p id="imageLikes${media.id}" class="imagesLikes">${media.likes}</p><i id="btnCounter${media.id}" class="fas fa-heart" tabindex="5"></i>
          </div>
        </footer>
    </div>`;
} 
 function generateVideo(media) {
  return `
    <div class="presentation">
      <video controls autoplay class="photographerWork" alt="${media.title}" tabindex="5 ">
        <source src="/assets/images/${media.video}" type="video/mp4">
      </video>
        <footer class="photographerWorkInfo">
          <p class="imagesName">${media.title}</p>
          <div class="likesCounter">
          <p id="imageLikes${media.id}" class="imagesLikes">${media.likes}</p><i id="btnCounter${media.id}"class="fas fa-heart" tabindex="5"></i>
          </div>
        </footer>
    </div>`;
} 


 // likes counting function 


const generateCounters = (media) => {

let likesButton = document.querySelector(`#btnCounter${media.id}`); 
let imageCount = document.querySelector(`#imageLikes${media.id}`);

let count = media.likes; // Original number of likes per media

    likesButton.addEventListener('click', (e) =>{
        e.stopPropagation(); 
        count +=1;
        imageCount.innerHTML = ``;
        imageCount.innerHTML = count;
        updateTotal();
    });

    // adds a like when ENTER key pressed
    likesButton.addEventListener('keyup', (e) =>{
      e.stopPropagation(); // Makes the heart clickable without opening the lightbox 
      if(e.keyCode === 13) {
        count +=1;
        imageCount.innerHTML = ``;
        imageCount.innerHTML = count;
        updateTotal();
      }
  });
  };

  // Total likes function 
  Array.prototype.total = function (){
    let t = 0;
    for (let i = 0; i < this.length; i++) {
      if(typeof this [i] !== 'number') {
        t += 0;
        continue;
      }
      t += this[i];
    }
    return t;
  }
  
  export const updateTotal = () => { // export in the photographerInfo.js file where the HTML is
    const html = document.querySelector(".imagesLikesTotal");
    const additionLikes = document.querySelectorAll(".imagesLikes");
    html.innerHTML = "";
    const counts = [...additionLikes].map((item) => Number(item.innerHTML)).total();
    html.innerHTML = counts;
  }


// display media according to type

 
const displayMedia = (medias) => {
    const mediaContainer = document.getElementById("media");

    mediaContainer.innerHTML = "";

    for(let media of medias) {
        const element = document.createElement("div");

        element.innerHTML = media.hasOwnProperty('image')
         ? generateImage(media) 
         : generateVideo(media)

        // Opens lightbox on click
        element.addEventListener('click', () => { 
        lightbox.classList.add('active');  
        generateLightbox(media, medias);     
      })   
      // Opens lightbox when ENTER key pressed
      element.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
          lightbox.classList.add('active');
          generateLightbox(media, medias);
        }
      })
      mediaContainer.appendChild(element); 
      generateCounters(media);
      }
};    
displayMedia(medias); 













