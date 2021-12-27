const form = document.getElementById('login');
const email = document.getElementById('email')
const password = document.getElementById('password')
const formAlertDOM = document.querySelector('.form-alert')

form.addEventListener('submit', async (e) =>{
  e.preventDefault()
  const useremail = email.value 
  const userpass  = password.value 
  if(userpass){
    try {
        const user =  await axios.post('/api/v1/auth/login', { email: useremail, password: userpass})
        console.log(user)
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `Login Successful...`;
        //store the whole object passed back in localStorage 
        localStorage.setItem('user', JSON.stringify(user.data));
        window.location.href = "chat.html";

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