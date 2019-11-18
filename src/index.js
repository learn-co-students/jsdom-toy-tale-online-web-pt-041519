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


const toyName = document.querySelector("body > div.container > form > input:nth-child(2)")
const toyImage = document.querySelector("body > div.container > form > input:nth-child(4)")
const toyCollection = document.getElementById("toy-collection")


function newToy (){
  const submitBtn = document.querySelector('input.submit')
  submitBtn.addEventListener("click", function(event){
    event.preventDefault()
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName.value,
        image: toyImage.value,
        likes: 0
      })

    })
    .then(resp => resp.json())
    .then(json => buildToy(json))
    toyForm.style.display = "none"
  })
  

}


function buildToy (toy){
  const toys = document.getElementById("toy-collection")

  let div = document.createElement('div')
  div.className = "card"
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  let img = document.createElement('img')
  img.className = "toy-avatar"
  img.src = toy.image
  let p = document.createElement('p')
  p.innerText = toy.likes
  let btn = document.createElement('button')
  btn.className = "like-btn"
  btn.innerText = "like <3"
  div.append(h2, img, p, btn)
  toys.appendChild(div)
  btn.addEventListener("click", function(event){
    toy.likes += 1
    p.innerText = toy.likes
    console.log(toy.id)
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes
      })
    })
  })
}


async function getToys() {
  const resp = await fetch('http://localhost:3000/toys')
  const myData = await resp.json()
  console.log(JSON.stringify(myData))
  myData.forEach(toy => buildToy(toy))
  
}

document.addEventListener("DOMContentLoaded", function() {
  newToy()
  getToys()

});
