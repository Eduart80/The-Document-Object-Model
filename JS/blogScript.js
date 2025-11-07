const blogEntry = document.getElementsByClassName('submit-form')
const cardContainer = document.getElementsByClassName('blog-post')
const newCard = document.getElementsByClassName('card')
const userName = document.getElementById('userName')
const blogName = document.getElementById('blogName')
const textArea = document.getElementById('textArea')

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
console.log(localName);

blogEntry.addEventListener('click',(event)=>{

    if(event.target.classList.contains('btn')){
        const cloneCard  = newCard.cloneNode(true)
        cloneCard.style.display='block'
        cardContainer.appendChild(cloneCard)
        
    }
})

