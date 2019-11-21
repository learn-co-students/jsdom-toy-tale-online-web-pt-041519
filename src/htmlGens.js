

const toyHTML = (toy) => {
    return (`
        <div class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar"/>
            <p>${toy.likes} Likes </p>
            <button data-id=${toy.id} class="like-btn">Like <3</button>
        </div>
    `)
}

const allToys = toys => toys.map(toy => toyHTML(toy)).join('')
