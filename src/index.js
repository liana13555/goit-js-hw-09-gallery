import './sass/main.scss';

import pictures from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = makePictureCardMarkup(pictures);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function makePictureCardMarkup(pictures) {
    return pictures.map(({ preview, original, description }) => {
        return `
   <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"  
  >
    <img
      class="gallery__image"
      src="${preview}" 
      data-source="${original}" 
      alt="${description}" 
    />
  </a>
</li>
    `;
    }).join('');

}

function onGalleryContainerClick(evt) {
    evt.preventDefault();

    const isGalleryImage = evt.target.classList.contains('gallery__image');

    if (!isGalleryImage) {
        return;
    }

    // функция открытия модалки
    onOpenLightbox();

    refs.lightboxImage.src = evt.target.dataset.source;
    refs.lightboxImage.alt = evt.target.alt;


   console.log(evt.target);
}

/* 
Модальное окно для полноразмерного изображения
      Для того чтобы открыть, необходимо добавить на div.lightbox CSS-класс is-open
*/

const refs = {
    lightbox: document.querySelector('.js-lightbox'),
    closeLightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
    lightboxImage: document.querySelector('.lightbox__image'),
}

refs.lightboxImage.addEventListener('click', onOpenLightbox);

function onOpenLightbox() {
    window.addEventListener('keydown', onEscKeyPress);    
    refs.lightbox.classList.add('is-open');    
}

refs.closeLightboxBtn.addEventListener('click', onCloseLightbox);

function onCloseLightbox() {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.src = "";
    refs.lightboxImage.alt = "";
}

//Закрытие модального окна по клику на div.lightbox__overlay.

refs.lightbox.addEventListener('click', onLightboxClick);

function onLightboxClick(evt) {
  if (evt.target !== refs.lightboxImage) {
        onCloseLightbox();
    }    
}

// Закрытие модального окна по нажатию клавиши ESC

function onEscKeyPress(evt) {
    if (evt.code === 'Escape') {
     onCloseLightbox();   
    }    
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"
window.addEventListener('keydown', switchImages);

const arrayImg = pictures.map((item) => item.original); 
    
function switchImages(evt) {
    let index = arrayImg.indexOf(refs.lightboxImage.src);
    
    if (evt.code === 'ArrowRight') {
        if (index < arrayImg.length - 1) {
            refs.lightboxImage.setAttribute("src", arrayImg[index + 1]);
        } else {
            index = -1;
            refs.lightboxImage.setAttribute("src", arrayImg[index + 1]);
        }
    }
    if (evt.code === 'ArrowLeft') {
        if (index === 0) {
            index = arrayImg.length;
            refs.lightboxImage.setAttribute("src", arrayImg[index - 1]);
        } else refs.lightboxImage.setAttribute("src", arrayImg[index - 1]);
    }
}