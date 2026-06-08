const services = [
  { id: 1, name: "Dry Cleaning", price: 200 },
  { id: 2, name: "Wash and Fold", price: 100 },
  { id: 3, name: "Ironing", price: 30 },
  { id: 4, name: "Stain Removal", price: 500 },
  { id: 5, name: "Leather and Suede Cleaning", price: 999 },
  { id: 6, name: "Wedding Dress Cleaning", price: 2800 }
];

const serviceList = document.querySelector(".service-list");
const items = document.querySelector(".items");
const totalAmount = document.querySelector(".total-amount");
const itemMessage = document.querySelector(".item-message")
const bookingForm = document.querySelector("form");
const confirmMessage = document.querySelector(".confirm-message");
const confirmServiceMessage = document.querySelector(".confirm-service-message")
const aleartServiceMessage = document.querySelector(".aleart-service-message")

let selectedServices = [];

services.forEach(service => {
  serviceList.innerHTML += `
    <div class="service">
      <div class="service-left">
        <span>${service.name}</span>
        <p>₹${service.price}</p>
      </div>
      <button class="toggleButton" onclick="toggleService(this, ${service.id})">
        Add Service
      </button>
    </div>
  `;
});

function renderCart() {
  items.innerHTML = "";
  let totalPrice = 0;

  if (selectedServices.length === 0) {
    itemMessage.style.display = "flex";
    items.style.display = "none"
  } else {
    itemMessage.style.display = "none";
    items.style.display = "flex"
  }
  let listHtml = "<ol>"
  selectedServices.forEach(service => {
    listHtml += `
      <li>
        <div class="single-service">
          <span>${service.name}</span>
          <span>₹${service.price}</span>
        </div>
      </li>
    `;
    totalPrice += service.price;
  });

  listHtml += "</ol>"
  items.innerHTML = listHtml
  totalAmount.textContent = `₹${totalPrice}`;
}

function toggleService(button, id) {
  const service = services.find(item => item.id === id);
  const exists = selectedServices.some(item => item.id === id);

  if (exists) {
    selectedServices = selectedServices.filter(
      item => item.id !== id
    );
    button.textContent = "Add Service";
    button.style.color = ""
    button.style.backgroundColor = ""
  } else {
    selectedServices.push(service);
    button.textContent = "Remove Service";
    button.style.color = "red";
    button.style.backgroundColor = "#fff4f4"
  }
  renderCart();
}


bookingForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (selectedServices.length === 0) {
    aleartServiceMessage.style.display = "block"
  } else {
    const emailData = {
      user_email: document.getElementById("email").value,
      user_name: document.getElementById("name").value,
      user_number: document.getElementById("number").value,
    }
    
    const serviceId = "service_hom1baa"
    const templateId = "template_dk5cfur"
    
    emailjs.send(serviceId, templateId, emailData)

    selectedServices = []
    confirmMessage.style.display = "block"
    confirmServiceMessage.style.display = "block"
    aleartServiceMessage.style.display = "none"
    bookingForm.reset()
    
    const allBtn = document.querySelectorAll(".toggleButton")
    allBtn.forEach(btn => {
      btn.textContent = "Add Service";
      btn.style.color = "";
      btn.style.backgroundColor = "";
    })

    setTimeout(() => {
      confirmMessage.style.display = "none"
      confirmServiceMessage.style.display = "none"

    }, 4000);
    renderCart()
  }
})