(async function () {
  const grid = document.getElementById('archive-grid');
  const chipsContainer = document.getElementById('filter-chips');
  const summary = document.getElementById('archive-summary');

  if (!grid || !chipsContainer || !summary) return;

  const TAG_LABELS = {
    brand: 'Brand',
    logo: 'Logo',
    print: 'Print',
    editorial: 'Editorial',
    social: 'Social',
    photography: 'Photography',
    motion: 'Motion',
    'product-ui': 'Product UI',
    'image-manipulation': 'Image Manipulation',
    tshirt: 'T-Shirts',
    restoration: 'Restorations',
    'web-app': 'Web & App',
  };

  let data = [];
  try {
    const res = await fetch('./data/work.json');
    if (!res.ok) throw new Error('Failed to load work.json: ' + res.status);
    data = await res.json();
  } catch (err) {
    summary.textContent = 'Archive failed to load.';
    console.error(err);
    return;
  }

  data.sort((a, b) => (b.year || 0) - (a.year || 0));

  const tagCounts = { all: data.length };
  for (const item of data) {
    for (const tag of item.tags || []) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  function buildChip(tag, isPressed) {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.tag = tag;
    btn.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    const label = tag === 'all' ? 'All' : TAG_LABELS[tag];
    btn.appendChild(document.createTextNode(label));
    const count = document.createElement('span');
    count.className = 'count';
    count.textContent = String(tagCounts[tag]);
    btn.appendChild(count);
    return btn;
  }

  // Render chips: 'all' first, then tags present in data in the TAG_LABELS order
  chipsContainer.replaceChildren();
  chipsContainer.appendChild(buildChip('all', true));
  for (const tag of Object.keys(TAG_LABELS)) {
    if (tagCounts[tag]) chipsContainer.appendChild(buildChip(tag, false));
  }

  function buildTile(item) {
    const tile = document.createElement('div');
    tile.className = 'gallery-tile';
    tile.dataset.full = item.full;
    tile.dataset.id = item.id;
    tile.title = item.title;

    const img = document.createElement('img');
    img.src = item.thumb;
    img.alt = item.title;
    img.loading = 'lazy';
    tile.appendChild(img);

    return tile;
  }

  function renderTiles(filter) {
    const filtered = filter === 'all' ? data : data.filter(item => (item.tags || []).includes(filter));

    grid.replaceChildren();
    for (const item of filtered) {
      grid.appendChild(buildTile(item));
    }

    const years = filtered.map(i => i.year).filter(Boolean);
    let yearText = '';
    if (years.length) {
      const min = Math.min(...years);
      const max = Math.max(...years);
      yearText = min === max ? ' · ' + min : ' · ' + min + '–' + max;
    }
    summary.textContent = filtered.length + ' ' + (filtered.length === 1 ? 'piece' : 'pieces') + yearText;
  }

  chipsContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    chipsContainer.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
    chip.setAttribute('aria-pressed', 'true');

    renderTiles(chip.dataset.tag);
    document.dispatchEvent(new CustomEvent('archive:rendered'));
  });

  renderTiles('all');
  document.dispatchEvent(new CustomEvent('archive:rendered'));
})();
