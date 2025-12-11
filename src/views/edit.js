import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import userService from '../api/userervice.js';
import showService from '../api/showService.js';

const mainEl = document.querySelector('main')

export default async function showEditPage(ctx) {
   const showID = ctx.params.id;
   const show = await showService.getById(showID)
    render(editTemplate(show), mainEl)
}

function editTemplate(show){
    return html `
 
        <section id="edit">
          <div class="form">
            <h2>Edit Show</h2>
            <form @submit=${(e) => editShow(e, show._id)} class="edit-form">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="TV Show title"
                value=${show.title}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                value=${show.imageUrl}
              />
              <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
               value=${show.genre}
            />
            <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
             value=${show.country}
          />
              <textarea
                id="details"
                name="details"
                placeholder="Details"
                rows="2"
                cols="10"
              > ${show.details}</textarea>
              <button type="submit">Edit Show</button>
            </form>
          </div>
        </section>
    `
}
async   function editShow(e, showId){
 e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const showData = Object.fromEntries(formData);
    console.log(showData)
if(Object.values(showData).some(val => val === "")){
        return alert('All fields are required!');
    }

    try {
        const result = await showService.updateShow(showId, showData);
        console.log(result);
        page.redirect(`/details/${showId}`);
    } catch (err) {
        alert(err.message);
    }
}
