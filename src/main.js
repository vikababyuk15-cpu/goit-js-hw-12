import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoadMoreButton, hideLoadMoreButton, showLoader, hideLoader } from './js/render-functions.js';

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
        position: 'topRight' 
      });
    } else {
      createGallery(data.hits);
      if (totalPages > 1) {
        showLoadMoreButton();
      } else {
        iziToast.info({ 
          message: "We're sorry, but you've reached the end of search results.", 
          position: 'topRight' 
        });
      }
    }
  } catch (error) {
   
    console.error(error);
    iziToast.error({ 
      message: 'Failed to fetch images. Please try again later!', 
      position: 'topRight' 
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader(); 

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    if (page >= totalPages) {
      iziToast.info({ 
        message: "We're sorry, but you've reached the end of search results.", 
        position: 'topRight' 
      });
    } else {
      showLoadMoreButton();
    }

    const card = document.querySelector('.gallery-item');
    if (card) {
      window.scrollBy({ 
        top: card.getBoundingClientRect().height * 2, 
        behavior: 'smooth' 
      });
    }
  } catch (error) {
    //  додано обробку помилок для кнопки "Load More"
    console.error(error);
    iziToast.error({ 
      message: 'Something went wrong while loading more images!', 
      position: 'topRight' 
    });
  } finally {
    hideLoader(); 
  }
});