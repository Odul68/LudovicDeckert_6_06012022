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

// Close modal by pressing on the ESC key
document.addEventListener('keydown', function(e) {
  let keyCode = e.key;
  if (keyCode === "Escape") {
    modalbg.style.display = "none";
  }});

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