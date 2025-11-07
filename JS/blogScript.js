const blogEntry = document.getElementsByClassName('blog-entry')
const cardContainer = document.getElementsByClassName('blog-post')
const newCard = document.getElementsByClassName('card')
const userName = document.getElementById('userName')
const textArea = document.getElementById('textArea')

let localName=''
function readFromLocalStorage(){
    try{
        const readLocal = localStorage.getItem('userForm')
        const parseInfo = JSON.parse(readLocal)
        localName = parseInfo.name
        console.log(localName);
    }catch(e){
        console.log(e.message);
    }   
}
readFromLocalStorage()
console.log(localName);

blogEntry('click',(event)=>{
    const cloneCard  = newCard.cloneNode(true)
    cloneCard.style.display='block'
    cardContainer.appendChild(cloneCard)
    // if(event.target.classList.contains('btn')){
    //     const list = 
    // }
})

