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
document.addEventListener("DOMContentLoaded", function() {

const submit = document.querySelector('.submit')
const inputs = document.querySelectorAll('input.input-text')
const divCollect = document.querySelector('#toy-collection')

  fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      for(const toy of json){
        let h2 = document.createElement('h2')
          h2.innerText = toy.name
        
          let img = document.createElement('img')
          img.setAttribute('src', toy.image)
          img.setAttribute('class', 'toy-avatar')
        
          let p = document.createElement('p')
          p.innerText = `${toy.likes} likes`
        
          let btn = document.createElement('button')
          btn.setAttribute('class', 'like-btn')
          btn.setAttribute('id', toy.id)
          btn.innerText = "like"
          btn.addEventListener('click', (e) => {
            console.log(e.target.dataset);
            likes(e)
          })
        
          let divCard = document.createElement('div')
          divCard.setAttribute('class', 'card')
          divCard.append(h2, img, p, btn)
          divCollect.append(divCard)
      }
    })


    function createToy(configObj){
      return fetch('http://localhost:3000/toys', configObj)
      .then(function(response) {
        return response.json()
      })
      .then(function(toy) {
          let h2 = document.createElement('h2')
          h2.innerText = toy.name
        
          let img = document.createElement('img')
          img.setAttribute('src', toy.image)
          img.setAttribute('class', 'toy-avatar')
        
          let p = document.createElement('p')
          p.innerText = `${toy.likes} likes`
        
          let btn = document.createElement('button')
          btn.setAttribute('class', 'like-btn')
          btn.setAttribute('id', toy.id)
          btn.innerText = "like"
          btn.addEventListener('click', (e) => {
            console.log(e.target.dataset);
            likes(e)
          })
        
          let divCard = document.createElement('div')
          divCard.setAttribute('class', 'card')
          divCard.append(h2, img, p, btn)
          divCollect.append(divCard)
      })
    }

    submit.addEventListener("click", function(e){
      e.preventDefault()
      createToy({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: inputs[0].value, 
          image: inputs[1].value,
          likes: 0
        })
      })
    })

    

    function likes(e) {
      e.preventDefault()
      let more = parseInt(e.target.previousElementSibling.innerText) + 1
    
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify({
            "likes": more
          })
        })
        .then(res => res.json())
        .then((like_obj => {
          e.target.previousElementSibling.innerText = `${more} likes`;
        }))
    }


})



