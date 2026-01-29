import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

let query = '';
let page = 1;
let totalPages = 0;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.currentTarget.elements['search-text'].value.trim();
  
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!', position: 'topRight' });
    return;
  }

  page = 1; 
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalPages = Math.ceil(data.totalHits / 15);

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        iconColor: '#fff',
        maxWidth: 432,
      });
    } else {
      createGallery(data.hits);
      if (page < totalPages) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong!', position: 'topRight' });
  } finally {
    hideLoader();
    event.target.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);


    const card = document.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (page >= totalPages) {
      hideLoadMoreButton(); 
      iziToast.info({ 
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight'
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to load more images!', position: 'topRight' });
  } finally {
    hideLoader();
  }
});