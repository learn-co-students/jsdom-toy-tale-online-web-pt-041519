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
  const toyCollection = document.getElementById("toy-collection")
  const nameInput = document.querySelector("body > div.container > form > input:nth-child(2)")
  const imgURL = document.querySelector("body > div.container > form > input:nth-child(4)")

// wait for page to load
document.addEventListener("DOMContentLoaded", (e) => {
  fetchToys();
  submitNewToy()
});

// fetch toys
async function fetchToys(){
  let res = await fetch("http://localhost:3000/toys")
  let jsonObj = await res.json();
  jsonObj.forEach(toy => buildToys(toy));
};

// build toys
function buildToys(toy){
  const toyCollection = document.getElementById("toy-collection");
    const div = document.createElement("div")
    div.className = "card";
    const name = document.createElement("h2")
    name.innerText = toy.name;
    const image = document.createElement("img")
    image.src = toy.image;
    image.className = "toy-avatar";
    const p = document.createElement("p")
    p.innerHTML = `${toy.likes} Likes`
    const button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "Like <3"

    div.append(name, image, p, button)
    toyCollection.appendChild(div);

    button.addEventListener("click", (e) => {
      toy.likes += 1;
      p.innerText = toy.likes + " Likes";
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: toy.likes
        }) // add then stuff yadadadaa
      })
    });
    
};


function submitNewToy(){
  const submitBtn = document.querySelector("input.submit")
  // console.log(submitBtn)
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: nameInput.value,
        image: imgURL.value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(json => buildToys(json))
    .catch(err => console.log(err.message));
    toyForm.style.display = 'none';
  })
  
};
