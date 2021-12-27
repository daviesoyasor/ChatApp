const form = document.getElementById('register');
const fullname = document.getElementById('username');
const email = document.getElementById('email')
const password = document.getElementById('password')
const repassword = document.getElementById('repassword')
const image = document.getElementById('image')
const formAlertDOM = document.querySelector('.form-alert')

form.addEventListener('submit', async (e) =>{
  e.preventDefault()
  const username = fullname.value
  const useremail = email.value 
  const userpass  = password.value 
  const userpass2 = repassword.value 
  const img = image.value
  if(userpass === userpass2){
    try {
        await axios.post('/api/v1/auth/register', { username: username, email: useremail, password: userpass, profilePicture: img })
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, account created`
        // formAlertDOM.classList.ad('text-success')
      } catch (error) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
      }
  }else{
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Password does not match`
  }

})