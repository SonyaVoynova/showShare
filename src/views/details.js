import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import showService from '../api/showService.js';
import { checkIsOwner } from '../utils.js';

const mainEl = document.querySelector('main')

export default async function showDetailsPage(ctx) {
  const showID = ctx.params.id;
  const show = await showService.getById(showID)
  const isOwner = checkIsOwner(show)
  console.log(show)
    render(detailsTemplate(show, isOwner), mainEl)
}

function detailsTemplate(show, isOwner){
    return html `
   <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${show.imageUrl} alt="example1" />
            <div id="details-text">
              <p id="details-title">${show.title}</p>
              <div id="info-wrapper">
                <div id="description">
                  <p id="details-description">
                   ${show.details}
                  </p>
                </div>
              </div>
              
    ${isOwner ? html`
 <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
                <a href="/edit/${show._id}" id="edit-btn">Edit</a>
                <a @click=${() => deleteShow(show._id)} id="delete-btn">Delete</a>

              </div>
              ` : "" }
            </div>
          </div>
        </section>

`;
}

async function deleteShow(showID){
  const confirmDelete  = confirm('Are you sure you want to delete this show?');
if(confirmDelete)
  try{
  await showService.deleteShow(showID);
  page.redirect('/dashboard')
}catch(err){
  alert(err.message)
}
}