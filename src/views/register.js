import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import userService from '../api/userervice.js';

const mainEl = document.querySelector('main')

export default async function showRegisterPage() {
    render(registerTemplate(), mainEl)
}

function registerTemplate(){
    return html `
    <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${registerUser} class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>

    `
}
async function registerUser(e){
e.preventDefault();
const formData = new FormData(e.currentTarget);
const userData = Object.fromEntries(formData)

if(!userData.email || !userData.password || !userData['re-password']){
    return alert('All fields must be filled!')
}

if(userData.password !== userData['re-password']){
    return alert('Pass and re-pass don`t match!')
}
try {
    const result = await userService.register(userData);
    console.log(result)
    page.redirect('/')
} catch (err) {
    alert(err.message)
}
}