const formReg = document.getElementById('registrationForm')
const userName = document.getElementById('username')
const userNameError = document.getElementById('usernameError')
const userEmail = document.getElementById('email')
const userEmailError = document.getElementById('emailError')
const userPassword = document.getElementById('password')
const userPassError = document.getElementById('passwordError')
const confirmPassword = document.getElementById('confirmPassword')
const confPassError = document.getElementById('confirmPasswordError')


let localDB = []

formReg.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.classList.contains('submitBtn')) {
        let valid = true
        if (!userName.value || userName.value === undefined || userName.value.trim() === '') {
            checkValidation(userName, userNameError, true);
            valid = false;
        } else {
            userNameError.textContent = '';
            userNameError.style.display = 'none';
        }
       
        if (!userEmail.value || !validateEmail(userEmail.value)) {
            checkValidation(userEmail, userEmailError);
            valid = false;
        } else {
            userEmailError.textContent = '';
            userEmailError.style.display = 'none';
        }

        if (!userPassword.value || userPassword.value.length < 8 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(userPassword.value)) {
            checkValidation(userPassword, userPassError);
            valid = false;
        } else {
            userPassError.textContent = '';
            userPassError.style.display = 'none';
        }
       
        if (!confirmPassword.value || userPassword.value !== confirmPassword.value) {
            checkValidation(confirmPassword, confPassError)
            valid = false
        } else {
            confPassError.textContent = ''
            confPassError.style.display = 'none'
        }
        if (valid) {
            try{
            // localDB.push(`{'name':${userName.value}, 'email': ${userEmail.value}, 'password': ${userPassword.value}}`)
            const saveLocal = JSON.stringify(`{'name':${userName.value}, 'email': ${userEmail.value}, 'password': ${userPassword.value}}`)
            localStorage.setItem('userForm', saveLocal)
            alert(`Welcome to our Blog ${userName.value}!`)
            cleanUp()
            }catch(e){
                console.log('Local storage reading error: '+ e.message);
                
            }
        }
    }
})
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkValidation(inputElement, errorElement, isNameField = false) {
    let message = inputElement.validationMessage;
    if (inputElement.validity.valueMissing) {
        message = 'This field is required';
    } else if (isNameField && inputElement.value.trim() === '') {
        message = 'Name cannot be empty';
    } else if (inputElement.type === 'email' && inputElement.value && !validateEmail(inputElement.value)) {
        message = 'Please enter a valid email address.';
    } else if (inputElement.id === 'password' && inputElement.value.length > 0 && inputElement.value.length < 8) {
        message = 'Password must be at least 8 characters long.';
    } else if (inputElement.id === 'password' && inputElement.value.length >= 8 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(inputElement.value)) {
        message = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    } else if (inputElement.id === 'confirmPassword' && inputElement.value !== userPassword.value) {
        message = 'Passwords do not match';
    }
    errorElement.textContent = message;
    errorElement.style.display = message ? 'block' : 'none';
}
function cleanUp(){
    userName.value=''
    userEmail.value=''
    userPassword.value=''
    confirmPassword.value=''
}


