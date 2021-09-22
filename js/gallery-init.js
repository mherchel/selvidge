const path = '/gallery/';
const thumbsPath = '/gallery/thumbs/';
const images = [
  {
    filename: '1.jpg',
    desc: 'this is my tests',
  },
  {
    filename: '2.jpg',
    desc: '',
  },
  {
    filename: '3.jpg',
    desc: '',
  },
  {
    filename: '4.jpg',
    desc: '',
  },
  {
    filename: '6.jpg',
    desc: '',
  },
  {
    filename: '7.jpg',
    desc: '',
  },
  {
    filename: '8.jpg',
    desc: '',
  },
  {
    filename: '9.jpg',
    desc: '',
  },
  {
    filename: '10.jpg',
    desc: '',
  },
  {
    filename: '11.jpg',
    desc: '',
  },
  {
    filename: '12.jpg',
    desc: '',
  },
  {
    filename: '13.jpg',
    desc: '',
  },
  {
    filename: '14.jpg',
    desc: '',
  },
  {
    filename: '15.jpg',
    desc: '',
  },
  {
    filename: '16.jpg',
    desc: '',
  },
  {
    filename: '18.jpg',
    desc: '',
  },
  {
    filename: '19.jpg',
    desc: '',
  },
  {
    filename: '21.jpg',
    desc: '',
  },
  {
    filename: '23.jpg',
    desc: '',
  },
  {
    filename: '24.jpg',
    desc: '',
  },
  {
    filename: '25.jpg',
    desc: '',
  },
  {
    filename: '26.jpg',
    desc: '',
  },
  {
    filename: '27.jpg',
    desc: '',
  },
]


const galleryHtml = images.map(item => {
 return `
  <li class="site-photos__item">
    <a
      href="${path + item.filename}"
      class="glightbox site-photos__link"
      data-gallery="site-photos"
      data-title="${item.filename}"
      data-description="${item.desc}"
      data-desc-position="bottom"
    >
      <img class="site-photos__thumb" src="${thumbsPath + item.filename}" alt="${item.desc}" loading="lazy" />
    </a>
  </li>
 `
}).join('');

document.querySelector('.site-photos__list').innerHTML = galleryHtml;

const lightbox = GLightbox();
