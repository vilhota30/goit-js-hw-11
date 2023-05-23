
function renderTitleTheEnd (refs) {
    const titleH1TheEnd = `<h1 class="gallery__title"></h1>`;
    refs.gallery.insertAdjacentHTML('afterend', titleH1TheEnd);
    refs.titleH1TheEnd = document.querySelector('.gallery__title');
  
}

export default renderTitleTheEnd;