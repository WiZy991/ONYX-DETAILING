(function () {
  var modal = document.getElementById('galleryModal');
  var modalImg = document.getElementById('galleryModalImg');
  var modalClose = document.getElementById('galleryModalClose');
  var modalPrev = document.getElementById('galleryModalPrev');
  var modalNext = document.getElementById('galleryModalNext');
  var counterEl = document.getElementById('galleryModalCounter');

  if (!modal) return;

  var galleries = document.querySelectorAll('.project-gallery');
  var currentImages = [];
  var currentIndex = 0;

  function getSrc(i) {
    return currentImages[i] ? currentImages[i].src : '';
  }

  function openModal(images, index) {
    currentImages = images;
    currentIndex = (index + currentImages.length) % currentImages.length;
    modalImg.src = getSrc(currentIndex);
    modalImg.alt = currentImages[currentIndex] ? currentImages[currentIndex].alt : '';
    counterEl.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = getSrc(currentIndex);
    modalImg.alt = currentImages[currentIndex] ? currentImages[currentIndex].alt : '';
    counterEl.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
  }

  function showNext() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = getSrc(currentIndex);
    modalImg.alt = currentImages[currentIndex] ? currentImages[currentIndex].alt : '';
    counterEl.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
  }

  galleries.forEach(function (gallery) {
    var images = gallery.querySelectorAll('img');
    if (images.length === 0) return;
    gallery.addEventListener('click', function (e) {
      if (e.target.tagName !== 'IMG') return;
      var idx = parseInt(e.target.getAttribute('data-index'), 10);
      if (!isNaN(idx)) openModal(Array.prototype.slice.call(images), idx);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', showPrev);
  modalNext.addEventListener('click', showNext);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();
