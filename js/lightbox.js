(function () {
  // Build overlay via DOM methods
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('role', 'dialog');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox__close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '\u2715'; // ✕
  overlay.appendChild(closeBtn);

  const imgEl = document.createElement('img');
  imgEl.alt = '';
  overlay.appendChild(imgEl);

  document.body.appendChild(overlay);

  function open(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || '';
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (overlay.getAttribute('aria-hidden') === 'true') imgEl.src = '';
    }, 250);
  }

  // Event delegation — works for archive tiles, ASU tiles, dynamically rendered tiles
  document.addEventListener('click', (e) => {
    const tile = e.target.closest('.gallery-tile');
    if (tile) {
      const innerImg = tile.querySelector('img');
      const src = tile.dataset.full || (innerImg && innerImg.src);
      const alt = (innerImg && innerImg.alt) || tile.title || '';
      if (src) open(src, alt);
      return;
    }
    if (e.target === overlay || e.target === closeBtn) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') close();
  });
})();
