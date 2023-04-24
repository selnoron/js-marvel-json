const URL = "https://gateway.marvel.com:443/"
const allCharacters = "v1/public/characters?limit="
const API_KEY = "&apikey=99e8872c64d0e188e90ceec1b9aab9ef"
const req = new XMLHttpRequest()
req.open("GET", URL +allCharacters+100+API_KEY)
req.responseType="json"
persons = [
    'A-Bomb (HAS)', 'A.I.M.', 'Banshee (Theresa Rourke)',
    'Attuma', 'Arnim Zola', 'Avengers',
    'Baron Mordo (Karl Mordo)', 'Adam Warlock', 'Agent X (Nijo)'
]
req.onload = () => {
    let pers = req.response.data.results
    let pers_plus = []
    const lima = document.querySelector('.main')

    for (let per of pers) {
        for (let pe of persons) {
            if (per.name == pe) {
                if (per.name == "Agent X (Nijo)") {
                    per.description = "Nijo was an assassin, mercenary, and agent employed by the telepathic German assassin called the Black Swan. He blamed Deadpool for his brother's death as he was among the targets of Deadpool's apparently successful assassination of the Japanese crime lords named the Four Winds."
                }
                pers_plus.push(per)
            }
        }
    }
    
    console.log(pers_plus)
    
    for (let i of pers_plus) {
        const items = document.createElement('div')
        const title = document.createElement('div')

        items.style.cssText = 'width: 160px;height: 195px;border: 1px solid black;display: flex;flex-direction: column;background-size: cover;background-position: center;border-radius: 10px;s'
        title.style.cssText = 'border-top: 2px solid black;border-bottom: 2px solid black;width: 100%;height: 40px;background-color: aliceblue;margin-top: 80%;text-align: center;font-family:"Bruno Ace SC", cursive;padding-top: 6%;box-sizing: border-box;'
       
        let image
        if (i.name == 'Agent X (Nijo)') {
            image = 'https://i.pinimg.com/564x/f8/60/81/f86081528bbc72a5a1d0c84db181576e.jpg'
            items.style.backgroundImage = `url(https://i.pinimg.com/564x/f8/60/81/f86081528bbc72a5a1d0c84db181576e.jpg)`
        }
        else {
            image = i.thumbnail.path + '.' +i.thumbnail.extension
            items.style.backgroundImage = `url(${image})`
        }

        title.innerHTML = i.name.slice(0,13)
        items.append(title)

        items.addEventListener('click', () => {
            const body = document.querySelector('body')
            const charac = document.createElement('div')
            const first = document.createElement('div')
            const second = document.createElement('div')
            const img = document.createElement('div')
            const desc = document.createElement('div')
            charac.style.cssText = `
            width: 400px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 2px solid black;
            margin-left: 20px;
            `
            first.style.cssText = `
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 100px;
            `
            second.style.cssText = `
            width: 100%;
            flex-direction: column;
            display: flex;
            justify-content: space-around;
            padding-top: 10px;
            padding-bottom: 10px;
            `
            img.style.cssText = `
            width: 30%;
            background-size: cover;
            background-position: center;
            `
            desc.style.cssText = `
            width: 70%;
            `
            img.style.backgroundImage = `url(${image})`
            desc.innerHTML = `${i.description}`

            first.append(img)
            first.append(desc)

            for (let j of i.stories.items) {
                const film = document.createElement('div')
                film.style.cssText = `
                align-self: center;
                width: 90%;
                height: 50px;
                `
                film.innerHTML = j.name
                second.append(film)
            }
            charac.append(first)
            charac.append(second)
            body.append(charac)
        })
        lima.append(items)
    }
}
req.send()
