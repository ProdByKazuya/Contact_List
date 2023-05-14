const LOCAL_STORAGE_CONTACTS_KEY = "contacts"
const firstNameInput = document.querySelector(".firstName")
const lastNameInput = document.querySelector(".lastName")
const phoneNumberInput = document.querySelector(".phoneNumber")
const saveContactBtn = document.querySelector(".saveContactBtn")
const contactList = document.querySelector(".contactList")
const errorMessage = document.querySelector(".error_label")

saveContactBtn.addEventListener("click", saveContact)

function chechInputElement(input) {
    const inputLength = input.value.trim()
    if (inputLength.length < 3) {
        return false
    }

    return true
}

function saveContact() {
  const firstName = firstNameInput.value.trim()
  const lastName = lastNameInput.value.trim()
  const phoneNumber = phoneNumberInput.value.trim()

  if (!checkForm()) {
    return
  }

  if (!chechInputElement(firstNameInput)) {
  alert('The name must contain at least 3 characters')
  return
}

if (!chechInputElement(lastNameInput)) {
  alert('The last name must contain at least 3 characters')
  return
}

if (!chechInputElement(phoneNumberInput)) {
  alert('The phone must contain at least 7 characters')
  return
}


  const contact = {
    firstName,
    lastName,
    phoneNumber
  };

  let contacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)) || [];
  if (contacts.find((c) => c.phoneNumber === contact.phoneNumber)) {
    showError("Phone number already exists")
    return
  }

  contacts.push(contact);
  localStorage.setItem(LOCAL_STORAGE_CONTACTS_KEY, JSON.stringify(contacts));
  render();
  console.log(contact)
}

function render() {
  contactList.innerHTML = "";
  let contacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)) || [];
  for (let contact of contacts) {
    const li = document.createElement("li");
    li.innerText = `${contact.firstName} ${contact.lastName} - ${contact.phoneNumber}`;
    contactList.appendChild(li);
  }
}

function checkForm() {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const phoneNumber = phoneNumberInput.value.trim();

  if (!firstName || !lastName || !phoneNumber) {
    showError("Fill in all fields");
    return false;
  }

  return true;
}

function showError(message) {
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);
}

firstNameInput.addEventListener("input", () => {
  if (firstNameInput.value.length > 50) {
    firstNameInput.setCustomValidity("First name must be less than 50 characters");
  } else {
    firstNameInput.setCustomValidity("");
  }
})

lastNameInput.addEventListener("input", () => {
  if (lastNameInput.value.length > 50) {
    lastNameInput.setCustomValidity("Last name must be less than 50 characters");
  } else {
    lastNameInput.setCustomValidity("");
  }
})

phoneNumberInput.addEventListener("input", () => {
  const phoneNumber = phoneNumberInput.value.trim();
})

render()