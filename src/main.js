import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

let query = '';
let page = 1;
let totalPages = 0;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const loadingText = document.querySelector('.loading-text'); // Наш текст

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.currentTarget.elements['search-text'].value.trim();
  
  if (!query) return;

  page = 1; 
  clearGallery();
  hideLoadMoreButton();
  

  loadingText.classList.remove('hidden');

  try {
    const data = await getImagesByQuery(query, page);
    totalPages = Math.ceil(data.totalHits / 15);

    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found!', position: 'topRight' });
    } else {
      createGallery(data.hits);
      if (totalPages > 1) showLoadMoreButton();
      else iziToast.info({ message: "End of results", position: 'topRight' });
    }
  } catch (error) {
    console.log(error);
  } finally {

    loadingText.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  
  loadingText.classList.remove('hidden');

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    if (page >= totalPages) {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results", position: 'topRight' });
    } else {
      showLoadMoreButton();
    }

    const card = document.querySelector('.gallery-item');
    if (card) {
      window.scrollBy({ top: card.getBoundingClientRect().height * 2, behavior: 'smooth' });
    }
  } finally {
    loadingText.classList.add('hidden');
  }
});