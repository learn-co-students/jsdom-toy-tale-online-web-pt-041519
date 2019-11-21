const addNewToy = (obj) => {
    const container = document.querySelector('#toy-collection')
    const html = toyHTML(obj)
    container.innerHTML += html
}

const updateToys = async () => {
    const json = await getToys()
    const html = allToys(json)
    const container = document.querySelector('#toy-collection')
    container.innerHTML = html
}

const removeLastToy = () => {
    const container = document.querySelector('#toy-collection')
    const children = container.children
    children[children.length - 1].remove()
}

const updateLastToy = (toy) => {
    removeLastToy()
    addNewToy(toy)
}

const updateLikes = (id, likes) => {
    const toys = Array.from(document.querySelector('#toy-collection').children)
    const toUpdate = toys.find(el => {
        const btn = el.children[el.children.length -1]
        return btn.dataset.id == id
    })
    toUpdate.querySelector('p').innerText = `${likes} Likes`
}