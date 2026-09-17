const TELEGRAM_USERNAME = "xol1qulovu";



function formatPrice(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function renderProductCard(p) {
  const discount = p.oldPrice
    ? Math.round(100 - (p.price / p.oldPrice) * 100)
    : null;

  const badgeMap = {
    new: '<span class="badge badge--new" data-i18n="badge.new">Yangi</span>',
    sale: `<span class="badge badge--sale">-${discount}%</span>`,
    hot: '<span class="badge badge--hot" data-i18n="badge.hot">Top savdo</span>',
  };

  const badgeHtml = p.badge ? badgeMap[p.badge] : "";
  const oldPriceHtml = p.oldPrice
    ? `<span class="product-card__old-price">${formatPrice(p.oldPrice)} so'm</span>`
    : "";

  const tgMessage = encodeURIComponent(
    `Assalomu alaykum! "${p.name}" mahsulotini sotib olmoqchiman. Narxi: ${formatPrice(p.price)} so'm.`
  );

  const tgLink = `https://t.me/${TELEGRAM_USERNAME}?text=${tgMessage}`;

  return `
    <article class="product-card" data-tag="${p.tag}">
      <div class="product-card__media">
        <span class="product-card__icon">${CATEGORY_ICON[p.icon] || "🔧"}</span>
        ${badgeHtml}
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__specs">${p.specs}</p>
        <div class="product-card__price-row">
          <span class="product-card__price">${formatPrice(p.price)} so'm</span>
          ${oldPriceHtml}
        </div>
        <a class="btn btn--buy" href="${tgLink}" target="_blank" rel="noopener">
          <span data-i18n="btn.buy">Sotib olish</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </article>`;
}

function renderProducts(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p data-i18n="empty.title">Ushbu filtr bo'yicha mahsulot topilmadi</p>
      </div>`;
    return;
  }

  container.innerHTML = items.map(renderProductCard).join("");
}

function initProductPage(pageKey, containerId, filterBarId) {
  let items =
    pageKey === "deals"
      ? PRODUCTS.filter((p) => p.oldPrice !== null || p.badge === "sale")
      : PRODUCTS.filter((p) => p.page === pageKey);

  renderProducts(containerId, items);

  const filterBar = filterBarId ? document.getElementById(filterBarId) : null;
  if (!filterBar) return;

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;

    filterBar
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;
    const filtered =
      filter === "all" ? items : items.filter((p) => p.tag === filter);

    renderProducts(containerId, filtered);
  });
}

function renderFeaturedProducts(containerId) {
  const featured = PRODUCTS.filter((p) =>
    ["pc-001", "mon-001", "part-003", "part-011", "pc-002", "mon-005"].includes(p.id)
  );
  renderProducts(containerId, featured);
}