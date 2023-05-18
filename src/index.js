import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkupElem } from './createMarkup';
import { PixabayAPI } from './PixabayAPI';
import { refs } from './refsPageElem';
import { notifyInit } from './notifyInit';
import { spinnerStart, spinnerStop } from './pageSpinner';

const modalLightboxGallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
  