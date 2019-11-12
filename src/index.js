const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

//on page load
document.addEventListener('DOMContentLoaded', function() {
  fetchToys()
})

// 'GET' request to fetch all the toy objects
function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

// 'POST' request to create new toy objects
function postToy(event) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: event.name.value,
      image: event.image.value,
      likes: 0
    })
  })
  .then(function(response) { 
    return response.json()
  })
  .then(function(json) {
    renderToys(json)
  })
}

// use response data to create new toy
function renderToys(json) {

  for(const toy in json) {
      // make a <div class="card"> for each toy
      const divCard = document.createElement('div')
      
      // h2 tag with the toy's name
      const h2 = document.createElement('h2')
      h2.innerText = json[toy]["name"]
      divCard.appendChild(h2)

      // img tag with the src of the toy's image attribute and the class name "toy-avatar"
      const img = document.createElement('IMG')
      img.setAttribute("src", json[toy]["image"])
      img.setAttribute("width", "150")
      img.setAttribute("class", "toy-avatar")
      divCard.appendChild(img)

      // p tag with how many likes that toy has
      const p = document.createElement('p')
      p.innerText = `${json[toy]["likes"]} likes`
      divCard.appendChild(p)

      // button tag with a class "like-btn"
      const button = document.createElement('button')
      const buttonText = document.createTextNode('Like')
      button.appendChild(buttonText)
      button.setAttribute("class", "like-btn")
      divCard.appendChild(button)

      // add it to the toy-collection div
      const toyCollection = document.getElementById('toy-collection')
      toyCollection.appendChild(divCard)
  }
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // listen for add new toy button
    toyForm.addEventListener('submit', event => {
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})