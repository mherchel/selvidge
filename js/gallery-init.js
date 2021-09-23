const path = '/gallery/';
const thumbsPath = '/gallery/thumbs/';
const images = [
  {
    filename: '1.jpg',
    desc: 'Kitchen counter and backsplash',
  },
  {
    filename: '2.jpg',
    desc: 'Kitchen counter installation.',
  },
  {
    filename: '3.jpg',
    desc: 'Carpentry work.',
  },
  {
    filename: '4.jpg',
    desc: 'Backsplash installation.',
  },
  {
    filename: '6.jpg',
    desc: 'Range hood installation.',
  },
  {
    filename: '7.jpg',
    desc: 'Schematic drawing for a chimney cover.',
  },
  {
    filename: '8.jpg',
    desc: 'Fireplace revamp',
  },
  {
    filename: '9.jpg',
    desc: 'Attached shed construction showing framing.',
  },
  {
    filename: '10.jpg',
    desc: 'Attached shed construction showing siding installation.',
  },
  {
    filename: '11.jpg',
    desc: 'Doug and Jeremy next to a Selvidge and Sons yard sign.',
  },
  {
    filename: '12.jpg',
    desc: 'Bathroom detail showing tilework and bathtub.',
  },
  {
    filename: '13.jpg',
    desc: 'Bathroom work showing walk in shower.',
  },
  {
    filename: '14.jpg',
    desc: 'More bathroom wall work including inset and tile work.',
  },
  {
    filename: '15.jpg',
    desc: 'Walk in shower detail showing tile work and bench.',
  },
  {
    filename: '16.jpg',
    desc: 'More walk in shower details.',
  },
  {
    filename: '18.jpg',
    desc: 'Doug and Jeremy doing drywall/sheetrock work.',
  },
  {
    filename: '19.jpg',
    desc: 'Bathroom floor tile installation.',
  },
  {
    filename: '21.jpg',
    desc: 'Bathroom floating vanity installation.',
  },
  {
    filename: '23.jpg',
    desc: 'Completed bathroom project.',
  },
  {
    filename: '24.jpg',
    desc: 'Sliding glass door replacement.',
  },
  {
    filename: '26.jpg',
    desc: 'In the middle of a room remodel including walls, floor, and ceiling.',
  },
  {
    filename: '27.jpg',
    desc: 'Complete room remodel.',
  },
]


const galleryHtml = images.map(item => {
 return `
  <li class="site-photos__item">
    <a
      href="${path + item.filename}"
      class="glightbox site-photos__link"
      data-gallery="site-photos"
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
