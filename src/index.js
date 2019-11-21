const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false



updateToys()

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


toyForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const inputs = e.target.querySelectorAll('input')
  const name = inputs[0].value
  const image = inputs[1].value
  const toy = { name, image, likes: 0 }
  addNewToy(toy)
  inputs[0].value = ''
  inputs[1].value = ''
  try{
    const res = await postToy(toy)
    updateLastToy(res)
  }catch(err){
    console.log(err)
    removeLastToy()
  }
  addBtn.click()
})

document.addEventListener('click', async (e) => {
  if(e.target.className === 'like-btn'){
    const p = e.target.parentElement.querySelector('p')
    let likes = parseInt(p.innerText.split(' Likes')[0])
    const id = e.target.parentElement.children[e.target.parentElement.children.length - 1].dataset.id
    likes++
    updateLikes(id, likes)
    try{
      const url = `http://localhost:3000/toys/${e.target.dataset.id}`
      // const opts = {
      //   method: 'PATCH',
      //   headers: {
      //       'Content-Type': 'application/json',
      //       'Accept': 'application/json'
      //   },
      //   body: JSON.stringify( { likes })
      // }
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify( { likes })
      })
      const json = await res.json()
      console.log(json)
      if(res.status > 299){ throw new Error(res.status) }
    }catch(err){
      console.log(err)
      updateLikes(id, likes - 1)
    }
  }
})

// OR HERE!
