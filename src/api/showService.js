import { get, post, put, del } from './requester.js';
import { baseShowsUrl } from '../constants.js';

 async function getAll() {
    const result = await get (`${baseShowsUrl}?sortBy=_createdOn%20desc`);
    return result;
}


    async function getById(showId) {
    return await get(`${baseShowsUrl}/${showId}`);
}
 async function getByTitle(showTitle) {
    return await get(`${baseShowsUrl}?where=title%20LIKE%20%22${showTitle}%22`);
}


async function createShow(showData) {
     const { 'image-url': imageUrl, ...otherData } = showData;
    return await post(baseShowsUrl, { imageUrl, ...otherData });
}
async function updateShow(showId, showData) {
     const { 'image-url': imageUrl, ...otherData } = showData;
    const result = await put (`${baseShowsUrl}/${showId}`,{ imageUrl, ...otherData });
    return result;
}
async function deleteShow(showId) {
    const result = await del (`${baseShowsUrl}/${showId}`);
    
}
const showService = { getAll, getById, getByTitle, createShow, updateShow, deleteShow };
export default showService
