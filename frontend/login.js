let token = window.sessionStorage.getItem("jwt")
if(!token){
const login = document.getElementById("login")
const signup = document.getElementById("signup")
login.addEventListener('click', async ()=>{
    const data = {
    name : document.getElementById('name').value,
    email : document.getElementById('email').value,
    password : document.getElementById('password').value
    }
    const res = await fetch('/api/user/login',{
        method : "POST",
        body : JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const tok = await res.json()
    if(tok){
        sessionStorage.setItem("jwt",tok.token)
        window.location.assign("./posts.html")
    }
    return false
})
signup.addEventListener('click', async ()=>{
    const data = {
    name : document.getElementById('name').value,
    email : document.getElementById('email').value,
    password : document.getElementById('password').value
    }
    const res = await fetch('/api/user/register',{
        method : "POST",
        body : JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const tok = await res.json()
    if(tok){
    sessionStorage.setItem("jwt",tok.token)
    window.location.assign("./posts.html")
}
return false
})
}
else{
    window.location.assign("./posts.html")
}