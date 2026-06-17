const images = [
  {
    src: 'https://picsum.photos/id/1015/1200/900',
    thumb: 'https://picsum.photos/id/1015/600/450',
    title: 'Mountain Lake',
    description: 'A calm lake surrounded by dramatic mountains.',
  },
  {
    src: 'https://picsum.photos/id/1025/1200/900',
    thumb: 'https://picsum.photos/id/1025/600/450',
    title: 'Majestic Eagle',
    description: 'A close-up portrait of a powerful eagle in flight.',
  },
  {
    src: 'https://picsum.photos/id/1043/1200/900',
    thumb: 'https://picsum.photos/id/1043/600/450',
    title: 'River Bridge',
    description: 'A quiet bridge crossing a flowing river at dusk.',
  },
  {
    src: 'https://picsum.photos/id/1069/1200/900',
    thumb: 'https://picsum.photos/id/1069/600/450',
    title: 'Desert Road',
    description: 'A lonely road stretching across a warm desert landscape.',
  },
  {
    src: 'https://picsum.photos/id/1084/1200/900',
    thumb: 'https://picsum.photos/id/1084/600/450',
    title: 'Forest Path',
    description: 'A soft-lit forest path lined with tall trees.',
  },
  {
    src: 'https://picsum.photos/id/1080/1200/900',
    thumb: 'https://picsum.photos/id/1080/600/450',
    title: 'Golden Coast',
    description: 'Waves crashing over rocks during a golden sunset.',
  },
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function renderGallery() {
  images.forEach((image, index) => {
    const card = document.createElement('button');
    card.className = 'gallery-card';
    card.type = 'button';
    card.setAttribute('aria-label', `Open ${image.title}`);

    card.innerHTML = `
      <img src="${image.thumb}" alt="${image.title}" />
      <div class="card-overlay">
        <h2 class="card-title">${image.title}</h2>
        <p class="card-subtitle">${image.description}</p>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(card);
  });
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.remove('hidden');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const image = images[currentIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.title;
  lightboxCaption.textContent = `${image.title} � ${image.description}`;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (lightbox.classList.contains('hidden')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowLeft') {
    showPrev();
  }

  if (event.key === 'ArrowRight') {
    showNext();
  }
});

renderGallery();
