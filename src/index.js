const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener('DOMContentLoaded', function() {
  // Fetch toys from url
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => renderToys(json))
})

function renderToys(toys) {
  for(const toy in toys) {
    // Create card div, set class name, append to toy collection div
    const div = document.querySelector('div#toy-collection')
    const divCard = document.createElement('div')
    divCard.className = 'card'
    div.appendChild(divCard)

    // Create h2 and fill with toy's name
    const h2 = document.createElement('h2')
    h2.innerText = toys[toy]['name']
    divCard.appendChild(h2)
    
    // Create img, fill with src, set class name 
    const img = document.createElement('img')
    img.src = toys[toy]['image']
    img.style.width = '200px'
    img.className = 'toy-avatar'
    divCard.appendChild(img)

    // Create p and fill with number of likes
    const p = document.createElement('p')
    p.innerText = `${toys[toy]['likes']} likes`
    divCard.appendChild(p)

    // Create button and set class name
    const btn = document.createElement('button')
    btn.innerText = 'Like <3'
    btn.className = 'like-btn'
    btn.addEventListener('click', e => {
      e.preventDefault()
      addLike(e.target)
    })
    divCard.appendChild(btn)
  }
}

function addToy(toy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: toy.name.value,
      image: toy.image.value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

function addLike(toy) {
  // Set variable to the current number of likes
  const count = parseInt(toy.target.parentNode.querySelector('p').innerText)

  // Patch request to update number of likes
  fetch(`http://localhost:3000/toys/${toy.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: count + 1
    })
    .then(resp => resp.json())
    .then(json => renderToys(json))
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
