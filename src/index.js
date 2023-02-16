//constants declaration
const imgURL = "https://dog.ceo/api/breeds/image/random/4"
const dogsImgContainer = document.querySelector('#dog-image-container')
const breedUrl = "https://dog.ceo/api/breeds/list/all"
const breedsUl = document.querySelector('#dog-breeds')
const dropDown = document.querySelector('#breed-dropdown')
let breedsArray = []


//event handlers
breedsUl.addEventListener('click',userClick)
dropDown.addEventListener('change',siteDropdown)

//functions for images

function imgGrab() {
    fetch(imgURL)
    .then(resp=>resp.json())
    .then(images => { 
        const imgs = images.message
        let imgsArray = createImageElement(imgs)
        renderImages(imgsArray)
    })
}

function createImageElement(imgs) {
    return imgs.map((img) => {
        let i = `<img src=${img}>`
        return i
    })
}
function renderImages (imgsArray) {
    imgsArray.forEach(element => {
        renderElement(element)
    })
}

function renderElement(element) {
    dogsImgContainer.innerHTML+=element
}

//functions for breeds

function breedGrab() {
    fetch(breedUrl)
    .then(resp=>resp.json())
    .then(breeds => { 
        breedsArray = Object.keys(breeds.message)
        const breedsList = createLiElement(breedsArray)
        renderLis(breedsList)
    })
}
function createLiElement(breedsArray) {
    return breedsArray.map((breed) => {
        let li = `<li>${breed}</li>`
        return li
    })
}

function renderLis(breedsList){
    breedsList.forEach(element =>
        renderLiElement(element)
    )
}
function renderLiElement(element) {
    breedsUl.innerHTML+=element
}

//function for text change

function userClick(e) {
    if (e.target.style.color === 'purple') {
    e.target.style.color = 'black'
    } else {
        e.target.style.color = 'purple'
    }
}
 //function for dropdown

function siteDropdown (event) {
    const letter = event.target.value
    const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter))
    const filteredBreedList = createLiElement(filteredBreeds)
    breedsUl.innerHTML = ``
    renderLis(filteredBreedList)
    }

breedGrab()
imgGrab()