const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


document.addEventListener('DOMContentLoaded', function () {
  fetch("http://localhost:3000/toys").then(res => res.json())
  .then( toys => renderToys(toys))
})

function renderToys(toys) {
  toys.forEach(function (toy) {
    toyCard(toy)
  })
}

function toyCard(toy) {
  const div1 = document.querySelector('#toy-collection')
  const div = document.createElement('div')
  div1.appendChild(div)
  div.className = "card"
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const button = document.createElement('button')
  button.className = "like-btn"
  button.setAttribute("id", toy.id)
  h2.innerHTML = `${toy.name}`
  div.appendChild(h2)
  img.src = toy.image
  img.style = " margin-left: auto; margin-right: auto; width:60%;"
  div.appendChild(img)
  p.innerHTML = `${toy.likes} Likes`
  div.appendChild(p)
  button.innerHTML = "Like"
  div.appendChild(button)
  button.addEventListener('click', event => {
    event.preventDefault()
    addLikes(event.target)
  })
}



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      objToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})
function objToy(toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
  
}
function addLikes(toy) {
  //debugger
  let moreLikes = parseInt(toy.previousElementSibling.innerText) + 1
  console.log(toy.previousElementSibling.innerText)
  console.log(toy.id)
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
     
    body: JSON.stringify({"likes": moreLikes })
  }).then(res => toy.previousElementSibling.innerText = `${moreLikes} Likes` )
}
