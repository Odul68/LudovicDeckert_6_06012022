

import data from "../data.js"
import { updateTotal } from "./photographer.js";

const urlId = new URL(window.location.href);


/**
 IF media 'photographerId' === urlId 
THEN => select media ID and show informations
 */

// Photographer information - filter photographer id with url id 

let photographerInfo = data.photographers.filter((photographers)=>{return photographers.id === Number (urlId.searchParams.get("id"))})
console.log(photographerInfo)


// Display photographer's info from "data.js" and create HTML
const displayPhotographerInfo = (photographerInfo) => {
    const infoContainer = document.getElementById("photographerInfo");
    infoContainer.innerHTML = "";
    for(let photographer of photographerInfo) {
        const elementMedia = document.createElement("section");
        elementMedia.classList.add('photographerIntro')
        elementMedia.innerHTML = `
        <div class="photographerInfo">
            <h1 class="photographerTitle">${photographer.name}</h1>
            <p class="photographerLocation">${photographer.city}, ${photographer.country}</p> 
            <p class="photographerTagLine">${photographer.tagline}</p> 
        </div>
        <a class="contactButton" href="#" tabindex="2">Contactez-moi</a>
        <img src="../assets/photographer_id/${photographer.portrait}" class ="photoId" alt="${photographer.name}"/>
        `;
        infoContainer.appendChild(elementMedia);
    }

    /**
     * footer 
     * => total likes from photographer.js function
     * => price per day from data.js
     * 
     */    
    const footerInfo = document.getElementById("footer");
    footerInfo.innerHTML = "";
    for(let photographer of photographerInfo) {
        const elementPrice = document.createElement("section");
        elementPrice.classList.add('footerInfo')
        elementPrice.innerHTML = `
            <div class="footerTotalLikes">
            <p class="imagesLikesTotal">0</p> 
            <i class="fas fa-heart"></i>
            </div>
            <p class="photographerPrice">${photographer.price}€ / jour</p>
        `;
        footerInfo.appendChild(elementPrice);
        updateTotal();
    } 
};

displayPhotographerInfo(photographerInfo);



