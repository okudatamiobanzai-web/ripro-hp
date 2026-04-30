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

  // ---------- Categories (groupings of ITEMS) ----------
  const CATEGORIES = [
    {
      id: 'cat-plastic',
      emoji: '🧴',
      name: 'プラスチック類',
      summary: 'ラップ、硬プラ、塩ビ系シート/パイプ',
      priceRange: '¥66〜132 / kg',
      itemIds: ['item-wrap', 'item-tire', 'item-hardplastic'],
    },
    {
      id: 'cat-rubber',
      emoji: '🛞',
      name: 'ゴム・タイヤ',
      summary: 'タイヤ各種、ゴム類',
      priceRange: '¥99〜132 / kg',
      itemIds: ['item-metal', 'item-tires'],
    },
    {
      id: 'cat-wood',
      emoji: '📦',
      name: '木材・紙類',
      summary: '木製パレット、段ボールなど',
      priceRange: '0円回収〜¥66 / kg',
      itemIds: ['item-rubber', 'item-paper'],
      free: true,
    },
    {
      id: 'cat-foam',
      emoji: '🧩',
      name: '発泡・FRP',
      summary: '発泡スチロール、子牛用ハッチ等',
      priceRange: '¥132〜330 / kg',
      itemIds: ['item-vinyl', 'item-wood'],
    },
    {
      id: 'cat-mixed',
      emoji: '🗑',
      name: '混合・家電',
      summary: '混合廃棄物、家電製品',
      priceRange: '¥132〜 / 個別お見積り',
      itemIds: ['item-foam', 'item-appliance'],
    },
    {
      id: 'cat-metal',
      emoji: '⚙️',
      name: '金属・機械',
      summary: '金属くず、機械部品',
      priceRange: '0円回収〜有価買取',
      itemIds: ['item-mixed', 'item-machine'],
      free: true,
    },
  ];

  // ---------- Category cards rendering ----------
  const catGrid = document.getElementById('categoriesGrid');
  function renderCategories() {
    if (!catGrid) return;
    catGrid.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const items = cat.itemIds.map(id => ITEMS.find(it => it.id === id)).filter(Boolean);
      const itemNames = items.map(it => it.name).join(' / ');
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'cat-card' + (cat.free ? ' cat-card-free' : '');
      card.innerHTML =
        '<div class="cat-card-top">' +
          '<span class="cat-card-emoji">' + cat.emoji + '</span>' +
          '<span class="cat-card-count">' + items.length + '品目</span>' +
        '</div>' +
        '<h3 class="cat-card-name">' + cat.name + '</h3>' +
        '<div class="cat-card-price">' + cat.priceRange + '</div>' +
        '<p class="cat-card-items">' + itemNames + '</p>' +
        '<span class="cat-card-cta">タップで詳細を見る →</span>';
      card.onclick = () => openCategoryModal(cat.id);
      catGrid.appendChild(card);
    });
  }
  renderCategories();

  // ---------- Items table (collapsible) ----------
  const itemsTable = document.getElementById('itemsTable');
  function renderItemsTable(query) {
    if (!itemsTable) return;
    const q = (query || '').trim().toLowerCase();
    const visible = ITEMS.filter(it => {
      if (!q) return true;
      const hay = (it.name + ' ' + it.desc + ' ' + it.category + ' ' + (it.subitems||[]).map(s=>s.label+s.desc).join(' ')).toLowerCase();
      return hay.includes(q);
    });
    if (visible.length === 0) {
      itemsTable.innerHTML = '<tbody><tr><td colspan="3" style="text-align:center;padding:24px;color:#888;">該当なし</td></tr></tbody>';
      return;
    }
    let html = '<thead><tr><th>カテゴリ</th><th>品目</th><th>単価</th></tr></thead><tbody>';
    visible.forEach(it => {
      const cat = CATEGORIES.find(c => c.itemIds.includes(it.id));
      const catLabel = cat ? cat.name : it.category;
      html += '<tr data-cat="' + (cat ? cat.id : '') + '">' +
        '<td><span class="items-table-cat">' + catLabel + '</span></td>' +
        '<td><strong>' + it.name + '</strong></td>' +
        '<td class="items-table-price">' + it.priceLabel + '</td>' +
      '</tr>';
    });
    html += '</tbody>';
    itemsTable.innerHTML = html;
    itemsTable.querySelectorAll('tbody tr[data-cat]').forEach(row => {
      const catId = row.dataset.cat;
      if (!catId) return;
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => openCategoryModal(catId));
    });
  }
  renderItemsTable();

  const searchInput = document.getElementById('itemSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => renderItemsTable(e.target.value));
  }

  // ---------- Category modal ----------
  const modal = document.getElementById('modal');
  const catModalEyebrow = document.getElementById('catModalEyebrow');
  const catModalTitle = document.getElementById('catModalTitle');
  const catModalSummary = document.getElementById('catModalSummary');
  const catModalBody = document.getElementById('catModalBody');

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderItemBlock(it) {
    const subs = it.subitems || [];
    const subsHtml = subs.length ? subs.map(s => {
      const imgHtml = s.image
        ? '<img src="' + s.image + '" alt="' + escapeHtml(s.label || it.name) + '" loading="lazy">'
        : '<span class="ph-label">PHOTO · ' + escapeHtml(s.label || it.phLabel) + '</span>';
      const noteHtml = (s.note || '').trim() ? '<div class="cat-modal-note">' + escapeHtml(s.note) + '</div>' : '';
      const descHtml = (s.desc || '').trim() ? '<p class="cat-modal-subdesc">' + escapeHtml(s.desc) + '</p>' : '';
      return '<div class="cat-modal-sub">' +
        '<div class="cat-modal-sub-img">' + imgHtml + '</div>' +
        '<div class="cat-modal-sub-body">' +
          '<div class="cat-modal-sub-label">' + escapeHtml(s.label || it.name) + '</div>' +
          descHtml + noteHtml +
        '</div>' +
      '</div>';
    }).join('') : '';
    return '<section class="cat-modal-item">' +
      '<header class="cat-modal-item-head">' +
        '<h4>' + escapeHtml(it.name) + '</h4>' +
        '<span class="cat-modal-item-price">' + escapeHtml(it.priceLabel) + '</span>' +
      '</header>' +
      (subsHtml ? '<div class="cat-modal-subs">' + subsHtml + '</div>' : '') +
    '</section>';
  }

  function openCategoryModal(catId) {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    const items = cat.itemIds.map(id => ITEMS.find(it => it.id === id)).filter(Boolean);
    if (catModalEyebrow) catModalEyebrow.textContent = cat.priceRange;
    if (catModalTitle) catModalTitle.textContent = cat.emoji + ' ' + cat.name;
    if (catModalSummary) catModalSummary.textContent = cat.summary + '（' + items.length + '品目）';
    if (catModalBody) {
      catModalBody.innerHTML = items.map(renderItemBlock).join('');
    }
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const inner = modal.querySelector('.cat-modal');
      if (inner) inner.scrollTop = 0;
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
