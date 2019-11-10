  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })


document.addEventListener("DOMContentLoaded", function() {
  const toyBoxUrl = "http://localhost:3000/toys";
  const allToys = document.getElementById("toy-collection");
  const toyNameField = document.querySelector('input[name="name"]');
  const toyImageField = document.querySelector('input[name="image"]');
  const createToyBtn = document.querySelector('input.submit');
  
  // CREATE AND FORMAT A TOY CARD
  function createToyCard(toy) {
    const toyCard = document.createElement('div');
    const nameHolder = document.createElement('h2');
    const toyIcon = document.createElement('img');
    const numLikes = document.createElement('p');
    const likeButton = document.createElement('button');

    toyCard.className = "card";
    toyCard.dataset.toyIndex = toy.id
    nameHolder.innerText = toy.name;
    toyIcon.src = toy.image;
    numLikes.innerText = toy.likes;
    likeButton.className = "like-btn";
    likeButton.innerText = "Like <3";
    likeButton.addEventListener("click", likeToy);

    toyCard.appendChild(nameHolder);
    toyCard.appendChild(toyIcon);
    toyCard.appendChild(numLikes);
    toyCard.appendChild(likeButton);

    return toyCard;
  }

  // FETCH ALL TOYS FROM SOURCE, AND APPEND TO PAGE IN INDIVIDUAL TOY CARD
  async function getAllToys() {
    let response = await fetch(toyBoxUrl);
    let data = await response.json();

    for (toy of data) {
      allToys.appendChild(createToyCard(toy));
      console.log(toy);
    }
  }

  // POPULATE ALL INITIAL TOYS
  getAllToys();




  // POST FETCH REQUEST TO ADD NEW TOY

  createToyBtn.addEventListener("click", function(e) {
    e.preventDefault();

    let newToy = {
      name: toyNameField.value,
      image: toyImageField.value,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
  };

    async function addNewToy() {
      let response = await fetch(toyBoxUrl, configObj);
      let newToy = await response.json();

      allToys.appendChild(createToyCard(newToy));
    }

    addNewToy();
    
  })

  
  // FUNCTION TO LIKE TOY WITH BUTTON
  async function likeToy() {
    let toyUrl = `${toyBoxUrl}/${this.parentNode.dataset.toyIndex}`
    let likeNumNode = this.parentNode.querySelector('p');

    let newLikeNum = { "likes": parseInt(likeNumNode.innerText, 10) + 1 }

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newLikeNum)
    }

    let response = await fetch(toyUrl, configObj);
    let updatedToy = await response.json();

    likeNumNode.innerText = updatedToy.likes
  }

});
  
