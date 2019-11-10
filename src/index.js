const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyHeader = document.querySelector('div#toy-header')
let addToy = false
let toyCollection = document.querySelector('#toy-collection')

// After DOM load, fetch toy objects and populate #toy-collection
document.addEventListener('DOMContentLoaded', function() {

  // Fetch toys, then add cards
  fetchToys().then(toys => {
    toys.forEach(toy => {
      addCard(toy)
    })
  })

})

// Fetch toy json
function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
}

// Add card to #toy-collection
function addCard(toy) {
  let cardDiv = document.createElement('div')
  cardDiv.className = "card"

  let title = document.createElement('h2')
  title.innerText = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  let likes = document.createElement('p')
  likes.innerText = toy.likes + " likes"

  let btn = document.createElement('button')
  btn.className = "like-btn"
  btn.id = toy.id
  btn.innerText = "Like <3"
  btn.addEventListener('click', (event) => {
    event.preventDefault()
    increaseLikes(event)
  })

  // Assemble card
  cardDiv.append(title, img, likes, btn)

  // Add card to collection
  toyCollection.appendChild(cardDiv)
}

// Show/hide toy form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    
    // If form submitted, post new toy
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      submitToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// Submit new toy
function submitToy(data) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": data.name.value,
      "image": data.image.value,
      "likes": 0
    })
  }

  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    // Build card
    addCard(object)

    // Let user know submission worked
    let msg = document.createElement('p')
    msg.innerText = "Success! New toy added."
    toyHeader.appendChild(msg)
  })  
  .catch(function(error) {
    document.body.innerHTML = error.message
  })
}


// Increase likes
function increaseLikes(event) {
  let likeNumber = parseInt(event.target.parentNode.querySelector('p').innerText) + 1

  // Provisionally display like increase
  let likes = event.target.parentNode.querySelector('p')
  likes.innerText = likeNumber + " likes"

  // Submit new like
  submitPatch(likeNumber, event)
}

// Send patch request
function submitPatch(likeNumber, event) {

  // Configure object
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likeNumber
    })
  }

  // Fetch object and respond
  fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    event.target.parentNode.querySelector('p').innerText = `${likeNumber} likes`
  })
  .catch(function(error) {
    document.body.innerHTML = error.message
  })
}