const blogEntry = document.getElementsByClassName('submit-form')
const cardContainer = document.getElementsByClassName('blog-post')[0] 
// [0] get the first card as a sample for all newcards
const newCard = document.getElementsByClassName('card')[0]
const userName = document.getElementById('userName')
const blogName = document.getElementById('blogName')
const textArea = document.getElementById('textArea')
const errorElement = document.getElementById('errorMessage')

let localName=''
function readFromLocalStorage(){
    try{
        const readLocal = localStorage.getItem('userForm')
        const parseInfo = JSON.parse(readLocal)
        localName = parseInfo.name
    }catch(e){
        console.log(e.message);
    }   
}
readFromLocalStorage()
userName.innerHTML=localName

// new entry
for (let entry of blogEntry) {
    entry.addEventListener('click', (event) => {
        event.preventDefault()
        if (event.target.classList.contains('btn')) {
            if (validate(textArea, errorElement)) {// validate first

                const textFromUser = textArea.value
               
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
                    blogNameInCard.textContent = localName
                }
                cardContainer.appendChild(cloneCard)
                cleanUp() //
            }
        }
    });
}
function cleanUp(){
    textArea.value=''
}
function validate(textArea, errorElement) {
    let message = ''
    if (!textArea.value.trim()) {
        message = 'This field is required'
    } 
    errorElement.textContent = message
    errorElement.style.color = 'red'
    errorElement.style.display = message ? 'block' : 'none'
    return !message
}
