

async function getToys(){
    const res = await fetch('http://localhost:3000/toys')
    const json = await res.json()
    return json
}

const postToy = async(toy) => {
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(toy)
    }
    const res = await fetch('http://localhost:3000/toys', opts)
    if(res.status >= 300){ throw new Error(res.status) }
    return await res.json()
}