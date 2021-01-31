import galleryItems from './gallery-items.js';

const list = document.querySelector('.js-gallery');

const div = document.querySelector('.js-lightbox');

const modalImg = document.querySelector('.lightbox__image');

const btn = document.querySelector('.lightbox__button');


galleryItems.map((item) => {
     // console.log(item);
     const img = document.createElement('img');
     // console.log(img);
     img.classList.add('gallery__image');
     img.src = item.preview;
     img.setAttribute('data-source', item.original);
     img.alt = item.description;

     const link = document.createElement('a');
     // console.log(link);
     link.classList.add('gallery__link');
     link.href = item.original;

     link.append(img);

     const li = document.createElement('li');
     console.log(li);
     li.classList.add('gallery__item');

     li.append(link);

     list.append(li);

});

list.addEventListener('click', (e) => {
     e.preventDefault();
     let modalLink = e.target.dataset.source;
     div.classList.add('is-open');
     modalImg.src = modalLink;

});

btn.addEventListener('click', () => {
     div.classList.remove('is-open');
     modalImg.src = '';
});