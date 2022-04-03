import data from "./data.js"

const photographers = data.photographers

// Get info from "data.js" for each photographer card 
const displayList = (photographers) => {
    const idContainer = document.getElementById("cards");
    idContainer.innerHTML = "";
    for(let photographer of photographers) {
        const element = document.createElement("div");
        element.innerHTML = `
    <a href="/photographer/photographer.html?id=${photographer.id}">
        <div class="presentation">
            <img src="assets/photographer_id/${photographer.portrait}" class="image"/>
            <h2 class="photographerTitle">${photographer.name}</h2>
            <p class="photographerLocation">${photographer.city}, ${photographer.country}</p> 
            <p class="photographerTagLine">${photographer.tagline}</p> 
            <p class="photographerPrice">${photographer.price}€/jour</p>
        </div>
    </a>
    `;
    idContainer.appendChild(element);
}
};


displayList(photographers);