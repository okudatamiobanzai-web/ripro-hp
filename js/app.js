/* ================================================================
   RiPRO LP — App script (items-data.js駆動版)
   ================================================================ */
(function() {
  const ITEMS = (window.RIPRO_ITEMS || []).map(it => {
    const firstSub = (it.subitems && it.subitems[0]) || {};
    const priceStr = it.price || '';
    const m = priceStr.match(/(\d+)/);
    const priceNum = m ? parseInt(m[1], 10) : 0;
    return {
      id: it.id,
      name: it.name,
      price: priceNum,
      priceLabel: priceStr,
      category: it.category || 'other',
      free: !!it.free,
      desc: firstSub.desc || '',
      note: firstSub.note || '',
      phLabel: it.name,
      image: firstSub.image || null,
      subitems: it.subitems || []
    };
  });

  // ---------- Filter chips (dynamic) ----------
  const chipsContainer = document.querySelector('.sec-service .chips');
  function buildChips() {
    if (!chipsContainer) return;
    const cats = [];
    ITEMS.forEach(it => {
      if (it.category && !cats.includes(it.category)) cats.push(it.category);
    });
    const hasFree = ITEMS.some(it => it.free);
    chipsContainer.innerHTML = '';
    const mk = (filter, label, active) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (active ? ' chip-active' : '');
      b.dataset.filter = filter;
      b.textContent = label;
      return b;
    };
    chipsContainer.appendChild(mk('all', 'すべて', true));
    cats.forEach(c => chipsContainer.appendChild(mk(c, c, false)));
    if (hasFree) chipsContainer.appendChild(mk('free', '0円回収', false));
  }
  buildChips();

  // ---------- Item grid rendering ----------
  const grid = document.getElementById('itemsGrid');
  function renderItems(filter, query) {
    if (!grid) return;
    filter = filter || 'all';
    query = query || '';
    grid.innerHTML = '';
    const q = query.trim().toLowerCase();
    const visible = ITEMS.filter(it => {
      if (filter === 'free') return it.free;
      if (filter !== 'all' && it.category !== filter) return false;
      if (q) {
        const hay = (it.name + ' ' + it.desc + ' ' + it.category + ' ' + (it.subitems||[]).map(s=>s.label+s.desc).join(' ')).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (visible.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:#888;font-size:13px">該当する品目が見つかりません</div>';
      return;
    }
    visible.forEach(it => {
      const card = document.createElement('button');
      card.className = 'item' + (it.free ? ' item-free' : '');
      const imgHtml = it.image
        ? '<img src="' + it.image + '" alt="' + it.name + '" style="width:100%;height:100%;object-fit:cover;" loading="lazy">'
        : '<span class="ph-label">' + it.phLabel + '</span>';
      card.innerHTML =
        '<div class="item-img">' + imgHtml + '</div>' +
        '<div class="item-body">' +
          '<div class="item-name">' + it.name + '</div>' +
          '<div class="item-price">' + it.priceLabel + '</div>' +
          '<div class="item-tap">タップで詳細 →</div>' +
        '</div>';
      card.onclick = function() { openModal(it.id); };
      grid.appendChild(card);
    });
  }
  renderItems();

  // ---------- Filter + search listeners ----------
  let currentFilter = 'all';
  let currentQuery = '';
  document.querySelectorAll('.chip[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-filter]').forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      currentFilter = btn.dataset.filter;
      renderItems(currentFilter, currentQuery);
    });
  });
  const searchInput = document.getElementById('itemSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentQuery = e.target.value;
      renderItems(currentFilter, currentQuery);
    });
  }

  // ---------- Modal with carousel ----------
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById("modalImg");
  const modalImgLabel = document.getElementById("modalImgLabel");
  const modalName = document.getElementById('modalName');
  const modalPrice = document.getElementById('modalPrice');
  const modalTag = document.getElementById('modalTag');
  const modalDesc = document.getElementById('modalDesc');
  const modalNote = document.getElementById('modalNote');

  let currentItem = null;
  let currentSlide = 0;

  function showSlide(idx) {
    if (!currentItem) return;
    const subs = currentItem.subitems || [];
    if (subs.length === 0) return;
    currentSlide = ((idx % subs.length) + subs.length) % subs.length;
    const s = subs[currentSlide];
    if (modalImg) {
      if (s.image) {
        modalImg.innerHTML = '<img src="' + s.image + '" alt="' + (s.label || currentItem.name) + '" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;">';
      } else {
        modalImg.innerHTML = '<div class="ph-label">PHOTO · ' + (s.label || currentItem.phLabel) + '</div>';
      }
    }
    if (modalDesc) modalDesc.textContent = s.desc || currentItem.desc;
    if (modalNote) {
      modalNote.textContent = s.note || '';
      modalNote.style.display = (s.note || '').trim() ? '' : 'none';
    }
    updateDots();
  }

  function updateDots() {
    if (!modalImg) return;
    const imgHolder = modalImg;
    if (!imgHolder) return;
    let dotsWrap = document.getElementById('modalDots');
    if (!dotsWrap) {
      dotsWrap = document.createElement('div');
      dotsWrap.id = 'modalDots';
      dotsWrap.style.cssText = 'display:flex;justify-content:center;gap:6px;padding:8px 0;position:absolute;bottom:8px;left:0;right:0;z-index:2;';
      imgHolder.style.position = 'relative';
      imgHolder.appendChild(dotsWrap);
    }
    const subs = (currentItem && currentItem.subitems) || [];
    dotsWrap.innerHTML = '';
    if (subs.length <= 1) { dotsWrap.style.display = 'none'; return; }
    dotsWrap.style.display = 'flex';
    subs.forEach((_, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.style.cssText = 'width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;background:' + (i===currentSlide?'#fff':'rgba(255,255,255,.5)') + ';padding:0;';
      d.onclick = function() { showSlide(i); };
      dotsWrap.appendChild(d);
    });
    // Arrows
    let prevArrow = document.getElementById('modalPrev');
    let nextArrow = document.getElementById('modalNext');
    if (!prevArrow) {
      prevArrow = document.createElement('button');
      prevArrow.id = 'modalPrev';
      prevArrow.innerHTML = '‹';
      prevArrow.style.cssText = 'position:absolute;left:8px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.5);color:#fff;border:none;width:36px;height:36px;border-radius:50%;font-size:20px;cursor:pointer;z-index:2;';
      prevArrow.onclick = function(e) { e.stopPropagation(); showSlide(currentSlide - 1); };
      imgHolder.appendChild(prevArrow);
      nextArrow = document.createElement('button');
      nextArrow.id = 'modalNext';
      nextArrow.innerHTML = '›';
      nextArrow.style.cssText = 'position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.5);color:#fff;border:none;width:36px;height:36px;border-radius:50%;font-size:20px;cursor:pointer;z-index:2;';
      nextArrow.onclick = function(e) { e.stopPropagation(); showSlide(currentSlide + 1); };
      imgHolder.appendChild(nextArrow);
    }
    prevArrow.style.display = subs.length > 1 ? '' : 'none';
    nextArrow.style.display = subs.length > 1 ? '' : 'none';
  }

  function openModal(id) {
    const it = ITEMS.find(x => x.id === id);
    if (!it) return;
    currentItem = it;
    currentSlide = 0;
    if (modalName) modalName.textContent = it.name;
    if (modalPrice) modalPrice.textContent = it.priceLabel;
    if (modalTag) modalTag.textContent = it.category;
    showSlide(0);
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  const modalCloseBtn = document.getElementById('modalClose');
  if (modalCloseBtn) modalCloseBtn.onclick = closeModal;
  if (modal) modal.onclick = e => { if (e.target === modal) closeModal(); };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (modal && modal.classList.contains('open')) {
      if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
      if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
    }
  });

  // ---------- Simulator ----------
  const simRows = document.getElementById('simRows');
  const simTotal = document.getElementById('simTotal');
  const simBreakdown = document.getElementById('simBreakdown');
  const TRANSPORT = 5500;

  function addSimRow(defaultId, defaultQty) {
    if (!simRows) return;
    defaultQty = defaultQty || 120;
    const row = document.createElement('div');
    row.className = 'sim-row';
    const priceItems = ITEMS.filter(it => !it.free && it.price > 0);
    if (priceItems.length === 0) return;
    const selectedId = defaultId && priceItems.find(it => it.id === defaultId) ? defaultId : priceItems[0].id;
    row.innerHTML =
      '<select class="sim-item">' +
        priceItems.map(it => '<option value="' + it.id + '"' + (it.id===selectedId?' selected':'') + '>' + it.name + '（' + it.priceLabel + '）</option>').join('') +
      '</select>' +
      '<div class="sim-qty-wrap" data-unit="kg">' +
        '<input type="number" class="sim-qty" min="0" step="10" value="' + defaultQty + '">' +
      '</div>' +
      '<button class="sim-remove" aria-label="削除">×</button>';
    simRows.appendChild(row);
    row.querySelector('.sim-item').addEventListener('change', updateSim);
    row.querySelector('.sim-qty').addEventListener('input', updateSim);
    row.querySelector('.sim-remove').addEventListener('click', () => {
      if (simRows.children.length <= 1) return;
      row.remove();
      updateSim();
    });
    updateSim();
  }

  function updateSim() {
    if (!simRows || !simTotal || !simBreakdown) return;
    let total = 0;
    const breakdown = [];
    simRows.querySelectorAll('.sim-row').forEach(r => {
      const id = r.querySelector('.sim-item').value;
      const qty = parseFloat(r.querySelector('.sim-qty').value) || 0;
      const it = ITEMS.find(x => x.id === id);
      if (!it) return;
      const price = it.price || 0;
      const sub = price * qty;
      total += sub;
      if (qty > 0) {
        breakdown.push('<div class="bd-row"><span>' + it.name + ' ' + qty + 'kg × ' + price + '円</span><span>¥' + sub.toLocaleString() + '</span></div>');
      }
    });
    total += TRANSPORT;
    breakdown.push('<div class="bd-row"><span>収集運搬費</span><span>¥' + TRANSPORT.toLocaleString() + '</span></div>');
    simTotal.textContent = total.toLocaleString();
    simBreakdown.innerHTML = breakdown.join('');
  }

  const simAddRow = document.getElementById('simAddRow');
  if (simAddRow) {
    simAddRow.addEventListener('click', () => {
      const priceItems = ITEMS.filter(it => !it.free && it.price > 0);
      const next = priceItems[1] || priceItems[0];
      if (next) addSimRow(next.id, 50);
    });
  }
  const firstPriceable = ITEMS.find(it => !it.free && it.price > 0);
  if (firstPriceable) addSimRow(firstPriceable.id, 120);

  // ---------- Reveal-on-scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- Smooth anchor offset for sticky nav ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const nav = document.getElementById('nav');
      const navH = nav ? nav.offsetHeight : 60;
      const y = target.getBoundingClientRect().top + window.pageYOffset - navH - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
