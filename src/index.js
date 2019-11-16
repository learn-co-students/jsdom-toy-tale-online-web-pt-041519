const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyCol = document.getElementById("toy-collection")

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  fetchToy()
  postToy()

})

function fetchToy() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => {
      json.forEach(toy => {
        createToy(toy) 
      })
    })
}

function createToy(toy) {
  let card = document.createElement('div')
  card.classList = 'card'

  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  card.appendChild(h2)

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('src', 'toy-avatar')
  card.appendChild(img)

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  card.appendChild(p)

  let btn = document.createElement('btn')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "likes"
  btn.addEventListener('click', (e) => {
    likes(e)
  })
  card.appendChild(btn)

  toyCol.appendChild(card)
}

function postToy(toy_data) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'name': toy_data.name.value,
      'image': toy_data.image.value,
      'likes': 0      
    })
  }

    fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then((json => {
        let postToy = newToy(json)
        toyCol.appendChild('postToy')
      }))
}

function likes (e) {
  let countUp = parseInt(e.target.previousElementSibling.innerText) + 1
  
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": countUp
    })
  }

  fetch(`http://localhost:3000/toys/${e.target.id}`, configObj)
    .then(response => response.json())
    .then(json => {
      e.target.previousElementSibling.innterText = `${countUp} likes`
    })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
