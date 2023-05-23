import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkupElem } from './base.js/createMarkup';
import { PixabayAPI } from './base.js/PixabayAPI';
import { refs } from './base.js/refsPageElem';
import renderTitleTheEnd from './base.js/renderTitleTheEnd';
import { notifyInit } from './base.js/notifyInit';
import { spinnerStart, spinnerStop } from './base.js/pageSpinner';

renderTitleTheEnd(refs);
const changeTitleH1TheEnd = str => (refs.titleH1TheEnd.textContent = str);

const modalLightboxGallery = new SimpleLightbox('.gallery a', {
    captionDelay: 300,
  });

spinnerStart();

window.addEventListener('load', () => {
  console.log('All resources finished loading!');

  spinnerStop();
});

 refs.btnLoadMore.classList.add('is-hidden');

const pixaby = new PixabayAPI();

const options = {
  root: null,
  rootMargin:'100px',
  threshold: 1.0,
};

const loadMorePhotos = async function (entries, observer) {
  entries.forEach(async entry => {
    if(entry.isIntersecting) {
      observer.unobserve(entry.target);
      pixaby.incrementPage();

      spinnerStart();

      try {
        spinnerStart();
        const {hits} = await pixaby.getPhotos();
        const markup = createMarkupElem(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        changeTitleH1TheEnd('The End');
        

        if (pixaby.hasMorePhotos()) {
          const lastItem = document.querySelector('.gallery a:last-child');
          observer.observe(lastItem);
        } else 
        Notify.info(
          "We're sorry, but you've reached the end of search results.",
          notifyInit
        );
        modalLightboxGallery.refresh();
        scrollPage();
      } catch (error) {
        Notify.failure(error.message, 'Someting went wrong', notifyInit);
        clearPage();
      } finally {
        spinnerStop();
      }
    }
  });
};


const observer = new IntersectionObserver (loadMorePhotos, options);

const onSubmitClick = async event => {
  event.preventDefault();

  const {
    elements: {searchQuery},
  } = event.target;

  const search_query = searchQuery.value.trim().toLowerCase();

  if (!search_query) {
    clearPage();
    Notify.info('Enter data search!', notifyInit);
    changeTitleH1TheEnd('');
    return; 
  }
  pixaby.query = search_query;
  clearPage();

  try {
    spinnerStart();
    const {hits, total} = await pixaby.getPhotos();

    if (hits.length === 0) {
      Notify.failure(
        `Sorry, there are no images matching your ${search_query}. Please, try agan`, notifyInit
      );
      changeTitleH1TheEnd('');
      return;
    }
    const markup = createMarkupElem(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    pixaby.setTotal(total);
    Notify.success(`Hooray! We found ${total} images.`, notifyInit);

    if (pixaby.hasMorePhotos) {
      const lastItem = document.querySelector('.gallery a:last-child');
      observer.observe(lastItem);

    }
    modalLightboxGallery.refresh();

  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!', notifyInit);
    clearPage();

  } finally {
    spinnerStop();
  }
}

const onLoadMore = async () => {
 pixaby.incrementPage();
 
 if (pixaby.hasMorePhotos()) {
  refs.btnLoadMore.classList.add('is-hidden');
  Notify.info("We're sorry, but you've reached the end of search results.");
  notifyInit;
 }
 try {
  const {hits} = await pixaby.getPhotos();
  const markup = createMarkupElem(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  modalLightboxGallery.refresh();
 } catch (error) {
  Notify.failure(error.message, 'Something went wrong!', notifyInit);
  clearPage();
 }
};

function clearPage() {
  pixaby.resetPage();
  refs.gallery.innerHTML = '';
  refs.btnLoadMore.classList.add('is-hidden');
}

refs.form.addEventListener('submit', onSubmitClick);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function scrollPage() {
 const {height: cardHeight} = document
 .querySelector('.photo-gallery')
 .firstElementChild.getBoundingClientRect();

 window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
 });
}


