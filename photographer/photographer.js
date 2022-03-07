
import data from "../data.js"

const urlId = new URL(window.location.href);
console.log(urlId.searchParams.get("id")); 

// Media list - Get media from ID

let medias = data.media.filter((media)=>{return media.photographerId === Number (urlId.searchParams.get("id"))})

// Create Div for medias : Images and Videos

const lightbox = document.createElement('div');
lightbox.id = 'lightbox'

const generateLightbox = media => {
  document.body.appendChild(lightbox)
  lightbox.innerHTML = `
<button class="lightboxClose"></button>
<button class="lightboxNext"></button>
<button class="lightboxPrevious"></button>
<div class="lightboxContainer">
<img src="/assets/images/${media.image}" class="photographerWork"/>
<div>
`;
lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
})
} 

/** 
const nextBtn = document.getElementsByClassName('.lightboxNext');
const lastArrayMedia = medias.length -1;
let lightboxInitMediaIndex = medias.findIndex(item => item._id === media.id);

nextBtn.addEventListener('click', () => {
  const next = lightboxInitMediaIndex === lastArrayMedia ? 0 : lightboxInitMediaIndex + 1;
  //const mediaToDisplay = media.image ? `<img src="/assets/images/${next.image}" class="photographerWork"/>`:
  lightboxContainer.innerHTML =  `<img src="/assets/images/${next.image}" class="photographerWork"/>`;
  lightboxInitMediaIndex = next;
})
console.log(nextBtn)*/

/** 
const prevBtn = document.querySelector('.lightboxPrevious');

prevBtn.addEventListener('click', () => {
  const prev = lightboxInitMediaIndex === lastArrayMedia ? 0 : lightboxInitMediaIndex - 1;
  // const mediaToDisplay = media.image ? `<img src="/assets/images/${next.image}" class="photographerWork"/>`:
  lightboxContainer.innerHTML =  `<img src="/assets/images/${prev.image}" class="photographerWork"/>`;
  lightboxInitMediaIndex = prev;
})*/

// one function per media type

function generateImage(media) {
  return `
    <div class="presentation">
      <img src="/assets/images/${media.image}" class="photographerWork"/>
        <footer class="photographerWorkInfo">
          <p class="imagesName">${media.title}</p>
          <p class="imagesLikes">${media.likes}<i class="fas fa-heart"></i></p>
        </footer>
    </div>`;
} 

 function generateVideo(media) {
  return `
    <div class="presentation">
      <video controls autoplay class="photographerWork">
        <source src="/assets/images/${media.video}" type="video/mp4">
      </video>
        <footer class="photographerWorkInfo">
          <p class="imagesName">${media.title}</p>
          <p class="imagesLikes">${media.likes}<i class="fas fa-heart"></i></p>
        </footer>
    </div>`;
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
      
      element.addEventListener('click', () => {
        lightbox.classList.add('active');
        generateLightbox(media)
      })    
        mediaContainer.appendChild(element);  
      }
};  
displayMedia(medias); 










