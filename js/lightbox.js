(function () {
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

  let lastFocus = null;
  let clearSrcTimer = null;

  function open(src, alt) {
    if (clearSrcTimer) { clearTimeout(clearSrcTimer); clearSrcTimer = null; }
    lastFocus = document.activeElement;
    imgEl.src = src;
    imgEl.alt = alt || '';
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    clearSrcTimer = setTimeout(() => {
      if (overlay.getAttribute('aria-hidden') === 'true') imgEl.src = '';
      clearSrcTimer = null;
    }, 250);
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.gallery-tile, [data-lightbox-src]');
    if (trigger) {
      // Don't hijack a text selection drag
      const selection = window.getSelection && window.getSelection().toString();
      if (selection) return;
      const innerImg = trigger.querySelector('img');
      const src = trigger.dataset.full || trigger.dataset.lightboxSrc || (innerImg && innerImg.src);
      const alt = trigger.getAttribute('aria-label') || (innerImg && innerImg.alt) || trigger.title || '';
      if (src) open(src, alt);
      return;
    }
    if (e.target === overlay || closeBtn.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') {
      close();
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement) {
      const trigger = document.activeElement.closest('[data-lightbox-src]');
      if (trigger) {
        e.preventDefault();
        const src = trigger.dataset.lightboxSrc;
        const alt = trigger.getAttribute('aria-label') || '';
        if (src) open(src, alt);
      }
    }
  });
})();
