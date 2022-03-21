
import data from "../data.js"

const urlId = new URL(window.location.href);

// Media list - Get media from ID

let medias = data.media.filter((media)=>{return media.photographerId === Number (urlId.searchParams.get("id"))})

// to show the dropdown button
document.getElementById("myBtn").onclick = function() {myFunction()};
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

/**  rotate arrow when clicked on
const arrow = document.querySelector("#arrow").addEventListener("click", () =>{
  arrow.style.transform = "rotate(180deg)";
})*/



// dropdown button to sort by likes / date / title (add a const for each addeventlistener ??)
document.querySelector("#popularity").addEventListener("click", () =>{
  const sortMedias = medias.sort((a,b) => a.likes - b.likes);
  displayMedia(sortMedias);
})
document.querySelector("#date").addEventListener("click", () =>{
  const sortMedias = medias.sort(function (x,y){
    let a = new Date(x.date),
        b = new Date(y.date);
    return a - b;
  })
  displayMedia(sortMedias);
});
document.querySelector("#title").addEventListener("click", () => {
    const sortMedias = medias.sort(function(x, y){
      let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    })
    displayMedia(sortMedias);
}); 


// Create Div for medias : Images and Videos


const lightbox = document.createElement('div');
lightbox.id = 'lightbox'

const generateButtons = (media, medias) => {
  const lightboxContainer = document.querySelector(".lightboxContainer");
  const nextBtn = document.querySelector(".lightboxNext");
  const prevBtn = document.querySelector(".lightboxPrevious");
  const lastArrayMedia = medias.length - 1;
  let lightboxInitMediaIndex = medias.findIndex(item => item.id === media.id);

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

      prevBtn.addEventListener('keydown',e => {
        console.log(e);
        if(e.keycode === 37){
          e.preventDefault()
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
        

  nextBtn.addEventListener('click', () => {
  const next = 
    lightboxInitMediaIndex === lastArrayMedia 
    ? 0 
    : lightboxInitMediaIndex + 1;
  const mediaToDisplay = medias[next].image // gets the next picture but not the next "lightbox.innerHTML"
  ? `<img src="/assets/images/${medias[next].image}" class="photographerWork"/>`     
  : `<video controls autoplay class="photographerWork">
  <source src="/assets/images/${medias[next].video}" type="video/mp4">
  </video>`;
  lightboxContainer.innerHTML =  `${mediaToDisplay}
  <p class="imagesNameLightbox">${medias[next].title}</p>`;
  lightboxInitMediaIndex = next;
  })

  nextBtn.addEventListener('keydown', e => {
    console.log(e);
    if(e.keycode === 39)
    e.preventDefault();
    const next = 
      lightboxInitMediaIndex === lastArrayMedia 
      ? 0 
      : lightboxInitMediaIndex + 1;
    const mediaToDisplay = medias[next].image // gets the next picture but not the next "lightbox.innerHTML"
    ? `<img src="/assets/images/${medias[next].image}" class="photographerWork"/>`     
    : `<video controls autoplay class="photographerWork">
    <source src="/assets/images/${medias[next].video}" type="video/mp4">
    </video>`;
    lightboxContainer.innerHTML =  `${mediaToDisplay}
    <p class="imagesNameLightbox">${medias[next].title}</p>`;
    lightboxInitMediaIndex = next;
    })

}


// Generate Lightbox depending on media


const generateLightbox = (media, medias) => {
  document.body.appendChild(lightbox)
  const mediaType = media.image 
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
generateButtons(media, medias);
} 


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
          <p class="imagesLikes">${media.likes}</p><button class="btnCounter" type="button"><i class="fas fa-heart"></i></button>
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

      // To change so that it's separated from the likes clicking button 
      /** 
      element.addEventListener('click', () => {
        lightbox.classList.add('active');
        generateLightbox(media, medias);
      })   */
      mediaContainer.appendChild(element); 
      }
};    
displayMedia(medias); 



 // likes counting function 

let likesButton = document.querySelector('.btnCounter'); // not declared in the displayMedia
let imageCount = document.querySelector('.imagesLikes');
console.log(imageCount)
/** 
let count = media.likes; // Needs to be in the displayMedia function
console.log(media.likes)*/

let count = 0;

    likesButton.addEventListener('click', () =>{ // properties of null and only one image
        count +=1;
        imageCount.innerHTML = count;
        console.log(count)
    });









