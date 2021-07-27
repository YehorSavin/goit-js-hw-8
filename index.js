import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".lightbox"),
  lightboxFon: document.querySelector(".lightbox__overlay"),
  lightboxImg: document.querySelector(".lightbox__image"),

  listImages: galleryItems
    .map(
      (image, index) => `
    <li class="gallery__item">
      <a
      class="gallery__link"
      href="${image.original}"
      >
        <img
          class="gallery__image"
          src="${image.preview}"
          data-source="${image.original}"
          alt="${image.description}"
          data-index="${index}"
        />
      </a>
          </li >
          `
    )
    .join(""),
};

let currentIndex = 0;

const apdateFn = (src = "", alt = "") => {
  refs.lightboxImg.src = src;
  refs.lightboxImg.alt = alt;
};

const closeModal = () => {
  refs.lightbox.classList.remove("is-open");
  apdateFn();
};

const openModal = (enent) => {
  currentIndex = +event.target.dataset.index;
  console.log(event.target.dataset.index);
  refs.lightbox.classList.add("is-open");
  apdateFn(event.target.dataset.source, event.target.alt);
};

refs.gallery.insertAdjacentHTML("beforeend", refs.listImages);

refs.gallery.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName !== "IMG") return;
  openModal();
});

refs.lightbox.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON" || event.target.tagName === "DIV") {
    closeModal();
  }
  return;
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    closeModal();
    return;
  }
  if (event.code === "ArrowRight") {
    currentIndex += 1;
    if (currentIndex > galleryItems.length - 1) {
      currentIndex = 0;
    }
    console.log("ArrowRight ", currentIndex);
  }
  if (event.code === "ArrowLeft") {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = galleryItems.length - 1;
    }
    console.log("ArrowLeft ", currentIndex);
  }
  apdateFn(
    galleryItems[currentIndex].original,
    galleryItems[currentIndex].description
  );
});