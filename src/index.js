const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyCollection = document.getElementById('toy-collection')

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', function() {
  getToy()
  postToy()
})

function getToy() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => {
    json.forEach(toy => {
      newToy(toy)
    })
  })
}

function newToy(toy) {
  let card = document.createElement('div')
  card.classList = 'card'

  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  card.appendChild(h2)

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  card.appendChild(img)

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  card.appendChild(p)

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'Like <3'
  btn.addEventListener('click', (e) => {
    likes(e)
  })
  card.appendChild(btn)

  toyCollection.appendChild(card)
}

function postToy(toy_data) {
  let Obj = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': toy_data.name.value,
      'image': toy_data.image.value, 
      'likes': 0
    })
  }

  fetch('http://localhost:3000/toys', Obj)
  .then(res = res.json())
  .then((json => {
    let fetchedToy = newToy(json)
    toyCollection.appendChild(fetchedToy)
  }))
}

function likes(e){
  console.log(e.target.id)
  e.preventDefault()
  let oneMore = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": oneMore 
    })
  })
    .then(res => res.json())
    .then((json => {
      e.target.previousElementSibling.innterText = `${oneMore} likes`
    }))
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
