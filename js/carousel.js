(() => {
  const quoteContainer = document.querySelector('.site-testimonials__list');
  const quotes = Array.from(quoteContainer.querySelectorAll('.site-testimonials__item'));
  const playPauseButton = document.querySelector('.site-testimonials__pause');
  const carouselControlsContainer = document.querySelector('.site-testimonials__controls');
  const carouselTimerDelay = 6000;
  const buttonContainer = document.querySelector('.site-testimonials__controls');
  let carouselTimer;

  /**
   * Creates a little control dot for each quote.
   */
  function initializeControls() {
    const controls = quotes
      .map((el, i) => {
        return `
        <li class="site-testimonials__control-item">
          <button class="site-testimonials__control-button">
            <span class="visually-hidden">Go to Slide ${i + 1}</span>
          </button>
        </li>
      `;
      })
      .join('');

    buttonContainer.innerHTML = controls;
  }

  /**
   * Is the carousel currently paused?
   * @returns boolean
   */
  function isCarouselPaused() {
    return playPauseButton.getAttribute('aria-pressed') === 'true';
  }

  /**
   * Determines if the carousel should autoplay.
   *
   * @returns boolean
   */
  function shouldCarouselAutoplay() {
    const localStorageSaysPlay = localStorage.getItem('carouselAutoplay');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ((reducedMotion && localStorageSaysPlay !== 'true') || localStorageSaysPlay === 'false') {
      return false;
    }
    return true;
  }

  /**
   * Toggles automatic playing of the carousel.
   */
  function handlePlayPause() {
    playPauseButton.setAttribute('aria-pressed', !isCarouselPaused());
    localStorage.setItem('carouselAutoplay', !isCarouselPaused());
  }

  /**
   * Gets the max height of all the quotes.
   *
   * @param {Array} quotes - array of list items containing quotes.
   * @returns number
   */
  function GetMaxQuoteHeight(quotes) {
    let maxHeight = 300;
    quotes.forEach(quote => {
      const height = quote.querySelector('.site-testimonials__quote').clientHeight;
      maxHeight = height > maxHeight ? height : maxHeight;
    });

    return maxHeight;
  }

  /**
   * Restarts the carousel timer.
   */
  function restartCarouselTimer() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(autoIncrementCarouselSlide, carouselTimerDelay);
  }

  /**
   * Set the min-height on the quotes containing element.
   *
   * @param {element} quoteContainer - containing element of quote.
   * @param {Array} quotes - array of list items containing quotes.
   */
  function setQuoteMinHeight(quoteContainer, quotes) {
    quoteContainer.style.setProperty('--max-quote-height', GetMaxQuoteHeight(quotes) + 'px');
  }

  /**
   * Transition the slide and active control button.
   * @param {number} toQuoteIndex
   */
  function transitionQuote(toQuoteIndex) {
    quotes.forEach(el => {
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('tabindex', '-1');
      el.classList.remove('is-active');
      el.classList.remove('is-prev');
      el.classList.remove('is-next');
    });

    const buttons = buttonContainer.querySelectorAll('.site-testimonials__control-button');

    let currentQuoteIndex = toQuoteIndex;
    if (currentQuoteIndex > quotes.length - 1) {
      currentQuoteIndex = 0;
    }

    let prevQuoteIndex = currentQuoteIndex - 1;
    if (prevQuoteIndex < 0) {
      prevQuoteIndex = quotes.length - 1;
    }

    let nextQuoteIndex = currentQuoteIndex + 1;
    if (nextQuoteIndex > quotes.length - 1) {
      nextQuoteIndex = 0;
    }

    quotes[prevQuoteIndex].classList.add('is-prev');
    quotes[nextQuoteIndex].classList.add('is-next');

    quotes[currentQuoteIndex].classList.add('is-active');
    quotes[currentQuoteIndex].removeAttribute('aria-hidden');
    quotes[currentQuoteIndex].removeAttribute('tabindex');

    buttons.forEach(el => el.setAttribute('aria-current', 'false'));
    buttons[currentQuoteIndex].setAttribute('aria-current', 'true');
  }

  /**
   * Gets triggered by clicks on the carousel controls.
   * @param {Event} e - The event object
   */
  function handleControlClick(e) {
    if (e.target.matches('.site-testimonials__control-button')) {
      const buttons = Array.from(buttonContainer.querySelectorAll('.site-testimonials__control-button'));
      const clickedIndex = buttons.indexOf(e.target);
      transitionQuote(clickedIndex);
      restartCarouselTimer();
    }
  }

  /**
   * Increments the carousel slide by 1 if not paused.
   */
  function autoIncrementCarouselSlide() {
    if (!isCarouselPaused()) {
      const current = quoteContainer.querySelector('.is-active');
      const index = quotes.indexOf(current);
      transitionQuote(index + 1);
    }
  }

  /**
   * Initialize everything.
   */
  function init() {
    initializeControls();
    setQuoteMinHeight(quoteContainer, quotes);
    transitionQuote(0);
    carouselTimer = setInterval(autoIncrementCarouselSlide, carouselTimerDelay);

    playPauseButton.addEventListener('click', handlePlayPause);
    if (!shouldCarouselAutoplay()) playPauseButton.click();

    carouselControlsContainer.addEventListener('click', handleControlClick);

    window.addEventListener('resize', () => {
      setQuoteMinHeight(quoteContainer, quotes);
    });

    quoteContainer.classList.add('is-initialized');
  }

  init();
})();
