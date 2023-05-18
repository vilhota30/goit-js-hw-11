import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '36527032-1dc1e86729cfcf20120d52579';

export class PixabayAPI {
    #page = 1;
    #per_page = 40;
    #query = '';
    #totalPages = 0;

    async getPhotos() {
        const params = {
            page: this.#page,
            q: this.#query,
            per_page: this.#per_page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }

        const urlAXIOS = `?key=${API_KEY}`;
        
        const { data } = await axios.get(urlAXIOS, { params, });
        return data;
    }

    get query() {
        this.#query;
    }

    set query(newQuery) {
        this.#query = newQuery;
    }

    incrementPage() {
        this.#page += 1;
    }

    resetPage() {
        this.#page = 1;
    }

    setTotal(total) {
        this.#totalPages = total;
    }

    hasMorePhotos() {
        return this.#page < Math.ceil(this.#totalPages / this.#per_page);
    }
  
    
};

