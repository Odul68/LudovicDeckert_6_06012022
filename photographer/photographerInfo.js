

import data from "../data.js"

const urlId = new URL(window.location.href);


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
        const elementMedia = document.createElement("section");
        elementMedia.classList.add('photographerIntro')
        elementMedia.innerHTML = `
        <div class="photographerInfo">
            <h1 class="photographerTitle">${photographer.name}</h1>
            <p class="photographerLocation">${photographer.city}, ${photographer.country}</p> 
            <p class="photographerTagLine">${photographer.tagline}</p> 
        </div>
        <a class="contactButton" href="#">Contactez-moi</a>
        <img src="/assets/photographer_id/${photographer.portrait}" class ="photoId"/>
        `;
        infoContainer.appendChild(elementMedia);
    }

    /**
     * footer 
     * total likes from photographer.js function
     *   => to separate it with a different innerHTML ?
     *   => add id through a const ? 
     * 
     * price per day OK 
     */    
    const footerInfo = document.getElementById("footer");
    footerInfo.innerHTML = "";
    for(let photographer of photographerInfo) {
        const elementPrice = document.createElement("section");
        elementPrice.classList.add('footerInfo')
        elementPrice.innerHTML = `
            <p class="imagesLikes">${photographer.price} <i class="fas fa-heart"></i></p> 
            <p class="photographerPrice">${photographer.price}€ / jour</p>
        `;
        footerInfo.appendChild(elementPrice);
    } 
};

displayPhotographerInfo(photographerInfo);



