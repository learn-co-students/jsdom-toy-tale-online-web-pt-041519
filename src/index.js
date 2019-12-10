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
  .then( toys  => renderCards(toys) )
} // end of fetchToys


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

    let likes = toy.likes
    cardDiv.setAttribute("likes", likes)
    let p = document.createElement('p')
    p.innerHTML = `${likes} Likes`
    cardDiv.appendChild(p)

    let btn = document.createElement('button')
    btn.classList.add("like-btn")
    btn.innerHTML = "Like <3"
    btn.id = toy.id
    // btn.addEventListener('click', (e) => console.log(e.target.id))
    btn.addEventListener('click', incrementLikes)
    cardDiv.appendChild(btn)
    collection.appendChild(cardDiv)

  }

}

const submit = document.querySelector('[name="submit"]');
submit.addEventListener('click', postNewToy);
 

function incrementLikes(event) {
 
  const likes = parseInt(event.target.parentElement.getAttribute("likes"))
  const id = event.target.id

  let formData = {
    likes: likes + 1
  };

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };


var element = event.target
  fetch(`http://localhost:3000/toys/${id}`, configObj)
  .then( response => response.json() )
  .then( json => {
      let card = document.getElementById(json.id)
      card.previousSibling.innerHTML = json.likes + " Likes"
    }
  )
}

function postNewToy() {
 
  let input = document.querySelector('[name="name"]');
  let name = input.value;
  let imgInput = document.querySelector('[name="image"]');
  let image = imgInput.value;

  let formData = {
    name: name,
    image: image,
    likes: 0,
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  // doesn't need to do anything to render new card after this fetch post.  the page
  // just updates automatically
  fetch('http://localhost:3000/toys', configObj)
  // .then( response => response.json() )
  // .then ( json => alert(json) )

}



fetchToys()


