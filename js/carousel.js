(() => {
  const quoteContainer = document.querySelector('.site-testimonials__list');
  const quotes = Array.from(quoteContainer.querySelectorAll('.site-testimonials__item'));
  const playPauseButton = document.querySelector('.site-testimonials__pause');

  function isCarouselPaused() {
    return playPauseButton.getAttribute('aria-pressed') === 'true';
  }

  function handlePlayPause() {
    playPauseButton.setAttribute('aria-pressed', !isCarouselPaused());
  }

  /**
   * Transition the quote.
   * @param {number} toQuoteIndex
   */
  function transitionQuote(toQuoteIndex) {
    quotes.forEach(el => {
      el.setAttribute('aria-hidden', 'true');
      el.classList.remove('is-active');
      el.classList.remove('is-prev');
      el.classList.remove('is-next');
    });

    let currentQuoteIndex = toQuoteIndex;
    if (currentQuoteIndex > quotes.length - 1) {
      currentQuoteIndex = 0;
    }

    let prevQuoteIndex = currentQuoteIndex - 1;
    if (prevQuoteIndex < 0) {
      prevQuoteIndex = quotes.length - 1
    }

    let nextQuoteIndex = currentQuoteIndex + 1;
    if (nextQuoteIndex > quotes.length - 1) {
      nextQuoteIndex = 0;
    }

    quotes[prevQuoteIndex].classList.add('is-prev');
    quotes[nextQuoteIndex].classList.add('is-next');

    quotes[currentQuoteIndex].classList.add('is-active');
    quotes[currentQuoteIndex].removeAttribute('aria-hidden');
  }

  function init() {
    transitionQuote(0);
    setInterval(() => {

      if (!isCarouselPaused()) {
        const current = quoteContainer.querySelector('.is-active');
        const index = quotes.indexOf(current);
        transitionQuote(index + 1);
      }

    }, 6000);

    playPauseButton.addEventListener('click', handlePlayPause);
  }

  init();
})();
