const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const toysCollection = document.querySelector("#toy-collection")

document.addEventListener('DOMContentLoaded', function() {
  fetchToys().then(toys => {
    toys.forEach(toy => {
      addCard(toy)
    })
  })
})

// fetch the toy objects 
function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
}

function addCard(toy) {
  //make a <div class="card">
  let card = document.createElement('div')
  card.setAttribute('class', 'card')

  // h2 tag with the toy's name
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  // img tag with the src of the toy's image attribute and the class name "toy-avatar"
  let img = document.createElement('IMG')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  // p tag with how many likes that toy has
  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  // button tag with a class "like-btn"
  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.innerText = 'Like'
  button.id = toy.id
  button.addEventListener('click', (event) => {
    event.preventDefault()
    increaseLikes(event)
  })

  // append to the 'toy-collection'
  card.append(h2, img, p, button)
  toysCollection.appendChild(card)
}

// a user clicks on the add new toy button, a POST request is sent
// and the new toy is added to Andy's Toy Collection
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', (event) => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!

// function to POST a new toy
function postToy(toy) {

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  }

  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    addCard(object)
  })
  .catch(function(error) {
    document.body.innerHTML = error.message
  })
}

function increaseLikes(event) {
  let likes = event.target.parentNode.querySelector('p')
  let likeCount = parseInt(event.target.parentNode.querySelector('p').innerText) + 1
  likes.innerText = likeCount + " likes"

  submitPatch(likeCount, event)
}

function submitPatch(likeCount, event) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount
    })
  }

  fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
  .then(function(response) {
    return response.json
  })
  .then(function(object) {
    event.target.parentNode.querySelector('p').innerText = `${likeCount} likes`
  })
  .catch(function(error) {
    document.body.innerHTML = error.message
  })
}