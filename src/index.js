const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
 // place toy collection in a variable 
const toysCollection = document.querySelector("#toy-collection")

// YOUR CODE HERE

// After DOM load, fetch toy objects and populate #toy-collection
document.addEventListener('DOMContentLoaded', function() {

  // Fetch toys, then add cards
  fetchToys().then(toys => {
    toys.forEach(toy => {
      addCard(toy)
    })
  })

})

function fetchToys() {
  // fetch the toy objects using the url
  return fetch('http://localhost:3000/toys')
  // return the response as JSON
  .then(function(response) {
    return response.json()
  })
}

//  function to add to toy collection 
function addCard(toy) {

  // create div for each card with a class of 'card'
    let card = document.createElement('div')
    card.setAttribute('class', 'card')

    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    // img tage with src of toys image + class name
    let img = document.createElement('IMG')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    // p tage with how many likes the toy has 
    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    // button tag - class "like-btn"
    let button = document.createElement('button')
    button.setAttribute('class', 'like-btn')
    button.innerText = 'Like'
    button.id = toy.id
    button.addEventListener('click', (event) => {
      event.preventDefault()
      increaseLikes(event)
    })

    // append to the toysCollection
    card.append(h2, img, p, button)
    toysCollection.appendChild(card)
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'

    // if form submitted, post new toy
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

// fumction to POST a new toy to the db (accepts name + image url)
function postToy(toyInfo) {

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyInfo.name.value,
      "image": toyInfo.image.value,
      "likes": 0
    })
  }

  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      // add the card here
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


// Increase Likes

// 1. COndtional Increase to the toy's like count

// 2. Patch request to the server at http://localhost:3000/toys/:id

function increaseLikes(event) {
  let likes = event.target.parentNode.querySelector('p')
  let likeNumber = parseInt(event.target.parentNode.querySelector('p').innerText) + 1
  likes.innerText = likeNumber + " likes"

  // submit new like
  submitPatch(likeNumber, event)
}

function submitPatch(likeNumber, event) {
  // configure obj

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likeNumber
    })
  }

  // fetch object and respond

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
