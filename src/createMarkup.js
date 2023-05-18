export function createMarkupElem (photos) {
    return photos
      .map(
        ({
          tags,
          webformatURL,
          largeImageURL,
          likes,
          views,
          comments,
          downloads,
        }) => {
            return `
            <a href='${largeImageURL}' class="card-link js-card-link">
        <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                 <p class="info-item">
                     <b>Likes</b>
                     ${likes}
                 </p>
                <p class="info-item">
                    <b>Views</b>
                    ${views}
                 </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                 </p>
                p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                 </p>
           </div>
        </div> 
        </a>`
        }

      )
      .join('');
    }





