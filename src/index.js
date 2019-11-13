const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    for (const element of object) {
      let toyCollection = document.getElementById("toy-collection")
      let h2 = document.createElement("h2")
      h2.textContent = element.name
      let img = document.createElement("img")
      img.className = "toy-avatar"
      img.src = element.image
      let p = document.createElement("p")
      p.textContent = element.likes
      let button = document.createElement("button")
      button.textContent = "Like <3"
      button.className = "like-btn"
      button.addEventListener("click", (event) => {
        likeToy(event, element)
      })
      let newDiv = document.createElement("div")
      newDiv.className = "card"
      toyCollection.appendChild(newDiv)
      newDiv.appendChild(h2)
      newDiv.appendChild(img)
      newDiv.appendChild(p)
      newDiv.appendChild(button)

      }
      // const likeButtons = document.getElementsByClassName("like-btn")
      // for (let i = 0; i < likeButtons.length; i++) {
      //   let toyName = likeButtons[i].parentElement.querySelector("h2").innerText
      //   likeButtons[i].addEventListener("click", likeToy(toyName))
      // }

  })


})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


let newToyButton = document.querySelector(".add-toy-form")
newToyButton.addEventListener("submit", createNewToy);

function createNewToy() {
  event.preventDefault()

let formData = {
  name: document.querySelector(".add-toy-form").querySelector('input[name="name"]').value,
  image: document.querySelector(".add-toy-form").querySelector('input[name="image"]').value,
  likes: 0
};


let configObject = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
};


fetch('http://localhost:3000/toys', configObject)
  .then(res => res.json())
   .then(function(object) {
    let toyCollection = document.getElementById("toy-collection")
    let h2 = document.createElement("h2")
    h2.textContent = object.name
    let img = document.createElement("img")
    img.className = "toy-avatar"
    img.src = object.image
    let p = document.createElement("p")
    p.textContent = object.likes
    let button = document.createElement("button")
    button.textContent = "Like <3"
    button.className = "like-btn"
    let newDiv = document.createElement("div")
    newDiv.className = "card"
    toyCollection.appendChild(newDiv)
    newDiv.appendChild(h2)
    newDiv.appendChild(img)
    newDiv.appendChild(p)
    newDiv.appendChild(button)
   })
}



function likeToy(event, toy) {
  event.preventDefault()
let configButton = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(event.target.previousElementSibling.innerText) + 1
    })
  };



fetch(`http://localhost:3000/toys/${toy.id}`, configButton)
   .then(function(response) {
     return response.json();
   })
   .then(function(object) {
    event.target.previousElementSibling.innerText = object.likes
   })
  }

  


