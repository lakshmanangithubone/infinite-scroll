const imgcontainer = document.querySelector(".img-container");
const loader = document.querySelector(".loader");

const count = 15;
let imageload = 0;
let totalimages = 0;
let ready;

const apiKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&city`;

// loading images

function imageloaded() {
  imageload++;

  if (imageload === totalimages) {
    ready = true;
    loader.hidden = true;
  }
}

function uploadphotos(data) {
  totalimages = data.length;
  data.forEach((image) => {
    imageload = 0;

    const anchor = document.createElement("a");
    anchor.setAttribute("href", image.links.html);
    anchor.setAttribute("target", "_blank");

    const img = document.createElement("img");

    img.setAttribute("src", image.urls.regular);
    img.setAttribute("alt", image.alt_description);
    img.setAttribute("title", image.alt_description);

    img.classList.add("photo");

    img.addEventListener("load", imageloaded);

    anchor.appendChild(img);
    imgcontainer.appendChild(anchor);
  });
}

// getting images from api

async function getphotos() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  uploadphotos(data);
  // console.log(data);
}

getphotos();

// if user scrolled through end of the page , execute getphotos function

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getphotos();
  }
});
