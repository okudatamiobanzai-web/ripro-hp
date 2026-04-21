/* ================================================================
   RiPRO HP — Items grid + carousel modal
   Data uses subitems[] so future picker work can append more
   slides (image/label/desc/note) without changing this file.
   ================================================================ */
(function(){
  const items = window.RIPRO_ITEMS || [];

  const grid = document.getElementById('itemsGrid');
  if(!grid) return;

  let currentFilter = 'all';
  let currentQuery = '';

  // Split price into main number + unit (small suffix).
  // e.g. "66円/kg" -> {main:"66", unit:"円/kg"}; "1t未満 無料" -> {main:"1t未満 無料", unit:""}
  function splitPrice(price){
    const m = price.match(/^([0-9０-９〜]+)\s*(.*)$/);
    if(m && m[2]) return {main:m[1], unit:m[2]};
    return {main:price, unit:''};
  }

  function renderGrid(){
    grid.innerHTML = '';
    const q = currentQuery.trim().toLowerCase();
    const visible = items.filter(it => {
      if(currentFilter === 'free'){ if(!it.free) return false; }
      else if(currentFilter !== 'all'){ if(it.category !== currentFilter) return false; }
      if(q){
        const hay = (it.name + ' ' + it.category + ' ' + it.subitems.map(s=>s.label+' '+s.desc).join(' ')).toLowerCase();
        if(!hay.includes(q)) return false;
      }
      return true;
    });
    if(visible.length === 0){
      grid.innerHTML = '<div class="items-empty">該当する品目が見つかりません</div>';
      return;
    }
    visible.forEach(it => {
      const idx = items.indexOf(it);
      const sp = splitPrice(it.price);
      const card = document.createElement('div');
      card.className = 'item-c' + (it.free ? ' fr' : '');
      card.innerHTML =
        '<span class="item-cat">' + it.category + '</span>' +
        '<img class="item-img" src="' + it.subitems[0].image + '" alt="' + it.name + '">' +
        '<div class="info">' +
          '<p class="nm">' + it.name + '</p>' +
          '<p class="pr">' + sp.main + (sp.unit ? '<small>' + sp.unit + '</small>' : '') + '</p>' +
          '<p class="tap">タップで詳細 →</p>' +
        '</div>';
      card.addEventListener('click', () => openModal(idx));
      grid.appendChild(card);
    });
  }

  // ---- filters: dynamically build chips from item categories ----
  function buildFilterChips() {
    const filtersEl = document.getElementById('itemsFilters');
    if (!filtersEl) return;
    // Collect unique categories in insertion order
    const categories = [];
    items.forEach(it => {
      if (it.category && !categories.includes(it.category)) categories.push(it.category);
    });
    // Build: すべて + カテゴリ順 + 0円回収（free品目がある場合）
    const hasFreeItems = items.some(it => it.free);
    filtersEl.innerHTML = '';
    const mk = (filter, label, active) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-chip' + (active ? ' active' : '');
      btn.dataset.filter = filter;
      btn.textContent = label;
      return btn;
    };
    filtersEl.appendChild(mk('all', 'すべて', true));
    categories.forEach(c => filtersEl.appendChild(mk(c, c, false)));
    if (hasFreeItems) filtersEl.appendChild(mk('free', '0円回収', false));
  }
  buildFilterChips();

  document.querySelectorAll('#itemsFilters .filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#itemsFilters .filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGrid();
    });
  });
  const searchInput = document.getElementById('itemsSearchInput');
  if(searchInput){
    searchInput.addEventListener('input', e => {
      currentQuery = e.target.value;
      renderGrid();
    });
  }

  // ---- modal + carousel ----
  const modal = document.getElementById('modal');
  const modalCat = document.getElementById('modalCat');
  const modalName = document.getElementById('modalName');
  const modalPrice = document.getElementById('modalPrice');
  const modalSubLabel = document.getElementById('modalSubLabel');
  const modalDesc = document.getElementById('modalDesc');
  const modalNote = document.getElementById('modalNote');
  const carousel = document.getElementById('modalCarousel');
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  let currentItem = null;
  let currentSlide = 0;

  function showSlide(i){
    if(!currentItem) return;
    const subs = currentItem.subitems;
    if(i < 0) i = subs.length - 1;
    if(i >= subs.length) i = 0;
    currentSlide = i;
    track.querySelectorAll('.carousel-slide').forEach((el, idx) => {
      el.classList.toggle('active', idx === i);
    });
    dotsWrap.querySelectorAll('.carousel-dot').forEach((el, idx) => {
      el.classList.toggle('active', idx === i);
    });
    const sub = subs[i];
    modalSubLabel.textContent = sub.label || '';
    modalSubLabel.style.display = sub.label ? 'block' : 'none';
    modalDesc.textContent = sub.desc || '';
    if(sub.note){
      modalNote.style.display = 'block';
      modalNote.textContent = sub.note;
    } else {
      modalNote.style.display = 'none';
    }
  }

  function openModal(itemIdx){
    const it = items[itemIdx];
    if(!it) return;
    currentItem = it;
    currentSlide = 0;

    modalCat.textContent = it.category;
    modalName.textContent = it.name;
    modalPrice.textContent = it.price;

    // build slides
    track.innerHTML = '';
    dotsWrap.innerHTML = '';
    it.subitems.forEach((sub, i) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');
      slide.innerHTML = '<img src="' + sub.image + '" alt="' + (sub.label || it.name) + '">';
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'スライド ' + (i + 1));
      dot.addEventListener('click', () => showSlide(i));
      dotsWrap.appendChild(dot);
    });
    carousel.classList.toggle('single', it.subitems.length <= 1);

    showSlide(0);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentItem = null;
  }

  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if(!modal.classList.contains('active')) return;
    if(e.key === 'Escape') closeModal();
    else if(e.key === 'ArrowLeft') showSlide(currentSlide - 1);
    else if(e.key === 'ArrowRight') showSlide(currentSlide + 1);
  });

  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

  // touch swipe
  let touchStartX = null;
  let touchStartY = null;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, {passive:true});
  track.addEventListener('touchend', e => {
    if(touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)){
      if(dx < 0) showSlide(currentSlide + 1);
      else showSlide(currentSlide - 1);
    }
    touchStartX = touchStartY = null;
  }, {passive:true});

  renderGrid();
})();
