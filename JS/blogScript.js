
// Retrieve form elements
const blogEntry = document.getElementsByClassName('submit-form')
const cardContainer = document.getElementsByClassName('blog-post')[0] // [0] get the first card as a sample for all newcards
const newCard = document.getElementsByClassName('card')[0]
const userName = document.getElementById('userName')
const userTittle = document.getElementById('userTitle')
const blogName = document.getElementById('blogName')
const textArea = document.getElementById('textArea')
const errorElement = document.getElementById('errorMessage')
const btnDelete = document.getElementById('delete-post')

let localName=[]
//read
function readFromLocalStorage(inputReq){
    try{
          const readName = localStorage.getItem(inputReq)
            localName = JSON.parse(readName)
    }catch(e){
        console.log(e.message);
    }   
}
readFromLocalStorage('userForm')
userName.innerHTML=localName.name

//create
function saveToLocalStorage(){
    try {
        const userObj = { name: localName.name, title: userTittle.value, texarea: textArea.value }
        let key = 'userBlog'
        if(localStorage.getItem('userBlog')){
            let storageLength = localStorage.length
            key = 'userBlog' + storageLength
            localStorage.setItem(key, JSON.stringify(userObj))
        } else {
            localStorage.setItem(key, JSON.stringify(userObj))
        }
        return key
    } catch (e) {
        console.log(e.message)
        return null
    }
}

//update
function updateToLocalStorage(){
    try{
        const readLocal = localStorage.getItem('userForm')
        const parseInfo = JSON.parse(readLocal)
        localName = parseInfo.name
    }catch(e){
        console.log(e.message);
    }   
}

// new card
// POST
for (let entry of blogEntry) {
    entry.addEventListener('click', (event) => {
        event.preventDefault()
        if (event.target.classList.contains('btn')) {
            if (validate(textArea, userTittle, errorElement)) {// validate first

                const textFromUser = textArea.value
                const inputTittle = userTittle.value

                const key = saveToLocalStorage()

                const cloneCard = newCard.cloneNode(true) //clone
                cloneCard.style.display = 'block'
                let contentSpan = cloneCard.querySelector('.card-content') // clone elements

                if (!contentSpan) {
                    contentSpan = document.createElement('span')
                    contentSpan.className = 'card-content'
                    cloneCard.appendChild(contentSpan)
                }
                contentSpan.textContent = textFromUser

                const blogNameInCard = cloneCard.querySelector('#blogName') // show the user name
                if (blogNameInCard) {
                    blogNameInCard.textContent = localName.name // name from localstorage
                }
                const titleElement = cloneCard.querySelector('.card-title') // show tittle
                if (titleElement) {
                    titleElement.textContent = inputTittle
                }
                cloneCard.setAttribute('data-key', key)

                cardContainer.appendChild(cloneCard)
                cleanUp() //
            }
        }
    });
}
// Delete
cardContainer.addEventListener('click', (event)=> {
    if (event.target.classList.contains('btn-delete')) {
        const card = event.target.closest('.card')
        if (card) {
            const key = card.getAttribute('data-key')
            if (key) {
                localStorage.removeItem(key)
            }
            card.remove()
        }
    }
})

// after reload page
function loadAllCardsFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)

        if (key && key.startsWith('userBlog')) {
            const data = JSON.parse(localStorage.getItem(key))
            console.log(data)
            
        
            }    
    }
}
loadAllCardsFromLocalStorage()

function cleanUp(){
    textArea.value=''
    userTittle.value=''
}
function validate(textArea, title, errorElement) {
    let message = ''
    if (!title.value.trim()) {
        message = 'This field is required'
    } 
    else if (!textArea.value.trim()) {
        message = 'This field is required'
    } 
    errorElement.textContent = message
    errorElement.style.color = 'red'
    errorElement.style.display = message ? 'block' : 'none'
    return !message
}
