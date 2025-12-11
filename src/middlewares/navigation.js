
import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import userService from '../api/userervice.js';
import { getToken } from '../utils.js';

const headerEl = document.querySelector('header');

export default function showNavigationPage(ctx, next) {
    const token = getToken();
    render(navigationTemplate(token), headerEl)
    next()
}

function navigationTemplate(token){
    return html `

        <a id="logo" href="/"
          ><img id="logo-img" src="./images/show_logo.png" alt="logo" />
        </a>
        <nav>
          <div>
            <a href="/dashboard">TV Shows</a>
            <a href="/search">Search</a>
          </div>
${token ? html`
          <!-- Logged-in users -->
          <div class="user">
            <a href="/create">Add Show</a>
            <a @click=${logoutUser} id=logout>Logout</a>
          </div>
` : html`
          <!-- Guest users -->
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`
}
        </nav>
        `

}

async function logoutUser(){
try{
await userService.logout();
page.redirect('/')
} catch(err){
    alert(err.message)
}

}
