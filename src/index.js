const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then( response => response.json() )
  // .then( (toys) => renderToys(toys))
  .then( toys => renderCards(toys))
}

function renderCards(toys) {
  const collection = document.getElementById("toy-collection")
  for (let toy of toys) {
    let cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    
    let h2 = document.createElement('h2')
    h2.innerHTML = `${toy.name}`
    cardDiv.appendChild(h2)

    let img = document.createElement('img')
    img.classList.add("toy-avatar")
    img.src = toy.image
    img.width = 200
    img.height = 200
    cardDiv.appendChild(img)

    let p = document.createElement('p')
    p.innerHTML = `${toy.likes} Likes`
    cardDiv.appendChild(p)

    let btn = document.createElement('button')
    btn.classList.add("like-btn")
    btn.innerHTML = "Like <3"
    cardDiv.appendChild(btn)

    collection.appendChild(cardDiv)
  }

}


const submit = document.querySelector('[name="submit"]');
submit.addEventListener('click', postNewToy);
 

function postNewToy() {
 
  let input = document.querySelector('[name="name"]');
  let name = input.value;
  let imgInput = document.querySelector('[name="image"]');
  let image = imgInput.value;

  let formData = {
    name: name,
    image: image,
    likes: 0
  };

  let configObj = {
    method: "POST",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch('http://localhost:3000/toys', configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
  // .then( response => response.json() )
  // .then ( object => alert(object))
  // .then( toy => renderNewCard(toy) )
 // postNewToy end
})}

function renderNewCard(toy)  {
  const collection = document.getElementById("toy-collection")
    let cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    
    let h2 = document.createElement('h2')
    h2.innerHTML = `${toy.name}`
    cardDiv.appendChild(h2)

    let img = document.createElement('img')
    img.classList.add("toy-avatar")
    img.src = toy.image
    img.width = 200
    img.height = 200
    cardDiv.appendChild(img)

    let p = document.createElement('p')
    p.innerHTML = `${toy.likes} Likes`
    cardDiv.appendChild(p)

    let btn = document.createElement('button')
    btn.classList.add("like-btn")
    btn.innerHTML = "Like <3"
    cardDiv.appendChild(btn)

    collection.appendChild(cardDiv)
}


fetchToys()
