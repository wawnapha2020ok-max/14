// ==============================================================================
// 🚀 MAIN APPLICATION CONTROLLER - Sampha Ra (สัมภาระ)
// ==============================================================================

import { INITIAL_CATEGORIES } from './products.js';
import { db } from './supabaseClient.js';
import { POSManager } from './pos.js';
import { InventoryManager } from './inventory.js';
import { ReportManager } from './report.js';
import { formatTHB, formatDateTime, generatePromptPayPayload, showToast } from './utils.js';

class App {
    constructor() {
        this.activeView = 'pos';
        this.products = [];
        this.currentCategory = 'all';
        this.searchTerm = '';

        // Managers
        this.pos = new POSManager(
            (cart, totals) => this.renderCart(cart, totals),
            (order) => this.onOrderFinalized(order)
        );
        this.inventory = new InventoryManager(() => this.onProductsUpdated());
        this.reports = new ReportManager();

        this.init();
    }

    async init() {
        this.initIcons();
        this.bindNavigation();
        this.bindPOSControls();
        this.bindStorefrontControls();
        this.bindInventoryControls();
        this.bindPaymentModal();
        this.bindReceiptModal();
        this.bindSupabaseModal();
        this.bindProductDetailModal();
        this.bindThemeToggle();

        // Load Initial Data
        await this.loadProducts();
        this.updateSupabaseStatusIndicator();
    }

    initIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // =========================================================================
    // 🧭 NAVIGATION & VIEW SWITCHING
    // =========================================================================
    bindNavigation() {
        const navBtns = document.querySelectorAll('.nav-mode-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.switchView(view);
            });
        });

        const brandHome = document.getElementById('btn-brand-home');
        if (brandHome) {
            brandHome.addEventListener('click', () => this.switchView('pos'));
        }
    }

    async switchView(viewName) {
        this.activeView = viewName;

        // Update nav button active states
        document.querySelectorAll('.nav-mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });

        // Hide all views, show active
        document.querySelectorAll('.main-view').forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Refresh views if needed
        if (viewName === 'pos') {
            this.renderPOSProducts();
        } else if (viewName === 'storefront') {
            this.renderStorefront();
        } else if (viewName === 'inventory') {
            this.renderInventoryTable();
        } else if (viewName === 'reports') {
            await this.renderReports();
        }

        this.initIcons();
    }

    // =========================================================================
    // 📦 PRODUCTS MANAGEMENT & RENDERING
    // =========================================================================
    async loadProducts() {
        this.products = await db.getProducts();
        this.renderPOSCategories();
        this.renderPOSProducts();
        this.renderStorefrontCategories();
        this.renderStorefront();
        this.renderInventoryTable();
    }

    onProductsUpdated() {
        this.loadProducts();
    }

    renderPOSCategories() {
        const container = document.getElementById('pos-category-container');
        if (!container) return;

        container.innerHTML = INITIAL_CATEGORIES.map(cat => `
            <button class="category-pill ${cat.id === this.currentCategory ? 'active' : ''}" data-cat="${cat.id}">
                <span>${cat.name_th}</span>
            </button>
        `).join('');

        container.querySelectorAll('.category-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                this.currentCategory = pill.dataset.cat;
                this.renderPOSCategories();
                this.renderPOSProducts();
            });
        });
    }

    renderPOSProducts() {
        const container = document.getElementById('pos-product-grid');
        if (!container) return;

        let filtered = this.products;

        // Category filter
        if (this.currentCategory && this.currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentCategory);
        }

        // Search filter
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(p => 
                (p.name && p.name.toLowerCase().includes(term)) ||
                (p.name_th && p.name_th.toLowerCase().includes(term)) ||
                (p.sku && p.sku.toLowerCase().includes(term))
            );
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-muted);">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
                    <p>ไม่พบสินค้ากระเป๋าที่ค้นหา</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(prod => {
            const isOutOfStock = prod.stock <= 0;
            const badgeClass = prod.badge ? `badge-${prod.badge.toLowerCase()}` : '';

            return `
                <div class="pos-product-card ${isOutOfStock ? 'out-of-stock' : ''}" data-id="${prod.id}">
                    <div class="pos-card-img-wrap">
                        <img src="${prod.image_url}" alt="${prod.name_th}" class="pos-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'">
                        ${prod.badge ? `<span class="badge ${badgeClass} pos-card-badge">${prod.badge}</span>` : ''}
                        <span class="pos-card-stock ${prod.stock <= 5 ? 'low-stock' : ''}">
                            ${isOutOfStock ? 'หมด' : `คงเหลือ: ${prod.stock}`}
                        </span>
                    </div>
                    <div class="pos-card-info">
                        <div>
                            <span class="pos-card-sku">${prod.sku}</span>
                            <h4 class="pos-card-title">${prod.name_th || prod.name}</h4>
                        </div>
                        <div class="pos-card-price-row">
                            <span class="pos-card-price">${formatTHB(prod.price)}</span>
                            <button class="pos-card-btn-add" ${isOutOfStock ? 'disabled' : ''}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach click handlers to add product to cart
        container.querySelectorAll('.pos-product-card').forEach(card => {
            card.addEventListener('click', () => {
                const prodId = card.dataset.id;
                const prod = this.products.find(p => p.id === prodId);
                if (prod && prod.stock > 0) {
                    this.pos.addToCart(prod, 1);
                }
            });
        });
    }

    // =========================================================================
    // 🛒 POS CART & CHECKOUT INTERACTIONS
    // =========================================================================
    bindPOSControls() {
        // Search & Barcode
        const searchInput = document.getElementById('pos-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.renderPOSProducts();
            });

            // Enter key on SKU -> Auto add if exact match
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const exactMatch = this.products.find(p => p.sku.toLowerCase() === this.searchTerm.trim().toLowerCase());
                    if (exactMatch) {
                        this.pos.addToCart(exactMatch, 1);
                        searchInput.value = '';
                        this.searchTerm = '';
                        this.renderPOSProducts();
                    }
                }
            });
        }

        // Clear Cart Button
        const clearBtn = document.getElementById('btn-clear-cart');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.pos.clearCart());
        }

        // Apply Coupon Button
        const couponBtn = document.getElementById('btn-apply-coupon');
        const couponInput = document.getElementById('cart-coupon-input');
        if (couponBtn && couponInput) {
            couponBtn.addEventListener('click', () => {
                const code = couponInput.value;
                if (this.pos.applyCoupon(code)) {
                    couponInput.value = '';
                }
            });
        }

        // Open Checkout Modal
        const checkoutBtn = document.getElementById('btn-open-checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.openPaymentModal());
        }
    }

    renderCart(cart, totals) {
        const list = document.getElementById('cart-items-list');
        const countBadge = document.getElementById('cart-badge-count');
        const subtotalEl = document.getElementById('cart-subtotal');
        const discountRow = document.getElementById('row-discount');
        const discountEl = document.getElementById('cart-discount');
        const vatEl = document.getElementById('cart-vat');
        const totalEl = document.getElementById('cart-total');
        const checkoutAmount = document.getElementById('btn-checkout-amount');
        const checkoutBtn = document.getElementById('btn-open-checkout');

        if (!list) return;

        countBadge.textContent = totals.itemCount;
        subtotalEl.textContent = formatTHB(totals.subtotal);
        vatEl.textContent = formatTHB(totals.vat);
        totalEl.textContent = formatTHB(totals.total);
        checkoutAmount.textContent = formatTHB(totals.total);

        checkoutBtn.disabled = cart.length === 0;

        if (totals.discount > 0) {
            discountRow.style.display = 'flex';
            discountEl.textContent = `-${formatTHB(totals.discount)}`;
        } else {
            discountRow.style.display = 'none';
        }

        if (cart.length === 0) {
            list.innerHTML = `
                <div class="cart-empty-state">
                    <div class="cart-empty-icon">👜</div>
                    <p>ยังไม่มีสินค้าในตะกร้า</p>
                    <small>แตะเลือกกระเป๋าทางซ้ายเพื่อเริ่มขาย</small>
                </div>
            `;
            return;
        }

        list.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image_url}" alt="${item.name_th}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name_th || item.name}</div>
                    <div class="cart-item-price">${formatTHB(item.price)} × ${item.quantity} = ${formatTHB(item.price * item.quantity)}</div>
                </div>
                <div class="cart-item-qty-ctrl">
                    <button class="qty-btn btn-qty-minus" data-id="${item.id}">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn btn-qty-plus" data-id="${item.id}">+</button>
                </div>
            </div>
        `).join('');

        // Bind item qty buttons
        list.querySelectorAll('.btn-qty-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.pos.updateQuantity(btn.dataset.id, -1);
            });
        });

        list.querySelectorAll('.btn-qty-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.pos.updateQuantity(btn.dataset.id, 1);
            });
        });
    }

    // =========================================================================
    // 💳 PAYMENT CHECKOUT MODAL
    // =========================================================================
    bindPaymentModal() {
        const modal = document.getElementById('modal-payment');
        const closeBtn = document.getElementById('btn-close-payment');
        const cancelBtn = document.getElementById('btn-cancel-payment');
        const confirmBtn = document.getElementById('btn-confirm-payment');

        const closeModal = () => modal.classList.remove('open');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        // Payment Tabs
        const payTabs = modal.querySelectorAll('.pay-tab-btn');
        payTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const method = tab.dataset.method;
                this.pos.currentPaymentMethod = method;

                payTabs.forEach(t => t.classList.toggle('active', t === tab));
                document.querySelectorAll('.pay-tab-content').forEach(c => c.style.display = 'none');
                
                const activeContent = document.getElementById(`pay-content-${method}`);
                if (activeContent) activeContent.style.display = 'block';

                if (method === 'promptpay') {
                    this.renderPromptPayQR();
                } else if (method === 'cash') {
                    this.updateCashCalculations();
                }
            });
        });

        // Cash inputs
        const cashInput = document.getElementById('cash-received-input');
        if (cashInput) {
            cashInput.addEventListener('input', () => {
                this.pos.cashReceived = Number(cashInput.value) || 0;
                this.updateCashCalculations();
            });
        }

        // Quick Cash Buttons
        document.querySelectorAll('.btn-quick-cash').forEach(btn => {
            btn.addEventListener('click', () => {
                const totals = this.pos.calculateTotals();
                const type = btn.dataset.cash;
                if (type === 'exact') {
                    this.pos.cashReceived = totals.total;
                } else {
                    const addAmount = Number(type);
                    this.pos.cashReceived = (this.pos.cashReceived || 0) + addAmount;
                }
                if (cashInput) cashInput.value = this.pos.cashReceived;
                this.updateCashCalculations();
            });
        });

        // Confirm Payment
        if (confirmBtn) {
            confirmBtn.addEventListener('click', async () => {
                const customerName = document.getElementById('pos-customer-name')?.value || 'หน้าร้าน (Walk-in)';
                const result = await this.pos.processPayment({ name: customerName });
                if (result) {
                    closeModal();
                    await this.loadProducts(); // refresh stock numbers
                }
            });
        }
    }

    openPaymentModal() {
        const totals = this.pos.calculateTotals();
        if (totals.total <= 0) return;

        const modal = document.getElementById('modal-payment');
        const totalDisplay = document.getElementById('pay-modal-total');
        totalDisplay.textContent = formatTHB(totals.total);

        // Reset cash
        this.pos.cashReceived = 0;
        const cashInput = document.getElementById('cash-received-input');
        if (cashInput) cashInput.value = '';

        // Default tab
        const promptPayTab = document.getElementById('tab-pay-promptpay');
        if (promptPayTab) promptPayTab.click();

        modal.classList.add('open');
        this.renderPromptPayQR();
    }

    renderPromptPayQR() {
        const totals = this.pos.calculateTotals();
        const canvasContainer = document.getElementById('promptpay-qr-canvas');
        if (!canvasContainer) return;

        canvasContainer.innerHTML = '';
        const canvas = document.createElement('canvas');
        canvasContainer.appendChild(canvas);

        const payload = generatePromptPayPayload(this.pos.promptPayAccount, totals.total);
        if (window.QRCode) {
            window.QRCode.toCanvas(canvas, payload, {
                width: 200,
                margin: 1,
                color: {
                    dark: '#003D79',
                    light: '#FFFFFF'
                }
            }, (error) => {
                if (error) console.error('QR code generation error:', error);
            });
        }
    }

    updateCashCalculations() {
        const totals = this.pos.calculateTotals();
        const changeDisplay = document.getElementById('change-display-amount');
        if (!changeDisplay) return;

        const diff = (this.pos.cashReceived || 0) - totals.total;
        if (diff >= 0) {
            changeDisplay.textContent = formatTHB(diff);
            changeDisplay.className = 'change-amount-text';
        } else {
            changeDisplay.textContent = `ยังขาดอีก ${formatTHB(Math.abs(diff))}`;
            changeDisplay.className = 'change-amount-text negative';
        }
    }

    // =========================================================================
    // 🧾 RECEIPT MODAL & PRINTING
    // =========================================================================
    bindReceiptModal() {
        const modal = document.getElementById('modal-receipt');
        const closeBtn = document.getElementById('btn-close-receipt');
        const doneBtn = document.getElementById('btn-done-receipt');
        const printBtn = document.getElementById('btn-print-receipt');

        const closeModal = () => modal.classList.remove('open');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (doneBtn) doneBtn.addEventListener('click', closeModal);

        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
    }

    onOrderFinalized(order) {
        this.renderReceipt(order);
        const modal = document.getElementById('modal-receipt');
        if (modal) modal.classList.add('open');
    }

    renderReceipt(order) {
        const container = document.getElementById('receipt-slip-content');
        if (!container || !order) return;

        let payMethodName = 'PromptPay QR';
        if (order.payment_method === 'cash') payMethodName = 'เงินสด (Cash)';
        if (order.payment_method === 'card') payMethodName = 'บัตรเครดิต (EDC)';

        container.innerHTML = `
            <div class="receipt-header">
                <div class="receipt-store-title">SAMPHA RA (สัมภาระ)</div>
                <div class="receipt-store-subtitle">Luxury Bags & Lifestyle Store</div>
                <div style="font-size: 0.7rem; color: #666;">สาขา สยามพารากอน โทร: 089-123-4567</div>
            </div>

            <div class="receipt-meta">
                <div class="receipt-meta-row">
                    <span>เลขที่บิล:</span>
                    <strong>${order.order_number}</strong>
                </div>
                <div class="receipt-meta-row">
                    <span>วันที่/เวลา:</span>
                    <span>${formatDateTime(order.created_at)}</span>
                </div>
                <div class="receipt-meta-row">
                    <span>พนักงานแคชเชียร์:</span>
                    <span>${order.cashier_name || 'Cashier 01'}</span>
                </div>
                <div class="receipt-meta-row">
                    <span>ลูกค้า:</span>
                    <span>${order.customer_name || 'ทั่วไป'}</span>
                </div>
            </div>

            <table class="receipt-items-table">
                <thead>
                    <tr>
                        <th>รายการ</th>
                        <th style="text-align: center;">จำนวน</th>
                        <th>รวม</th>
                    </tr>
                </thead>
                <tbody>
                    ${(order.items || []).map(item => `
                        <tr>
                            <td>
                                <div>${item.name_th || item.name || item.product_name}</div>
                                <small style="color: #666;">${item.sku || ''} @${formatTHB(item.price)}</small>
                            </td>
                            <td style="text-align: center;">${item.quantity}</td>
                            <td>${formatTHB(item.price * item.quantity)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="receipt-totals">
                <div class="receipt-totals-row">
                    <span>รวมเป็นเงิน:</span>
                    <span>${formatTHB(order.subtotal)}</span>
                </div>
                ${order.discount > 0 ? `
                    <div class="receipt-totals-row" style="color: #15803D;">
                        <span>ส่วนลดพิเศษ:</span>
                        <span>-${formatTHB(order.discount)}</span>
                    </div>
                ` : ''}
                <div class="receipt-totals-row">
                    <span>VAT 7% (รวมในยอด):</span>
                    <span>${formatTHB(order.vat)}</span>
                </div>
                <div class="receipt-totals-row grand-total">
                    <span>ยอดสุทธิ (Total):</span>
                    <span>${formatTHB(order.total_amount)}</span>
                </div>
                <div class="receipt-totals-row">
                    <span>วิธีชำระ:</span>
                    <span>${payMethodName}</span>
                </div>
                ${order.payment_method === 'cash' ? `
                    <div class="receipt-totals-row">
                        <span>รับเงินสดมา:</span>
                        <span>${formatTHB(order.amount_received)}</span>
                    </div>
                    <div class="receipt-totals-row">
                        <span>เงินทอน:</span>
                        <span>${formatTHB(order.change_amount)}</span>
                    </div>
                ` : ''}
            </div>

            <div class="receipt-footer">
                <p>*** ขอบคุณที่อุดหนุน Sampha Ra ***</p>
                <p style="font-size: 0.65rem;">สินค้ามีรับประกัน 1 ปี สามารถเปลี่ยนได้ภายใน 7 วันพร้อมใบเสร็จ</p>
            </div>
        `;
    }

    // =========================================================================
    // 👜 STOREFRONT (CUSTOMER CATALOG VIEW)
    // =========================================================================
    bindStorefrontControls() {
        const searchInput = document.getElementById('storefront-search');
        const sortSelect = document.getElementById('storefront-sort');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.renderStorefront());
        }
        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.renderStorefront());
        }
    }

    renderStorefrontCategories() {
        const container = document.getElementById('storefront-categories');
        if (!container) return;

        container.innerHTML = INITIAL_CATEGORIES.map(cat => `
            <button class="storefront-cat-btn ${cat.id === this.currentCategory ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.name_th}
            </button>
        `).join('');

        container.querySelectorAll('.storefront-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentCategory = btn.dataset.cat;
                this.renderStorefrontCategories();
                this.renderStorefront();
            });
        });
    }

    renderStorefront() {
        const grid = document.getElementById('storefront-grid');
        const searchInput = document.getElementById('storefront-search');
        const sortSelect = document.getElementById('storefront-sort');
        if (!grid) return;

        let items = [...this.products];

        // Category filter
        if (this.currentCategory && this.currentCategory !== 'all') {
            items = items.filter(p => p.category === this.currentCategory);
        }

        // Search filter
        const term = searchInput ? searchInput.value.toLowerCase() : '';
        if (term) {
            items = items.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.name_th.toLowerCase().includes(term) ||
                (p.material && p.material.toLowerCase().includes(term)) ||
                (p.description && p.description.toLowerCase().includes(term))
            );
        }

        // Sort
        const sort = sortSelect ? sortSelect.value : 'featured';
        if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
        if (sort === 'name') items.sort((a, b) => (a.name_th || a.name).localeCompare(b.name_th || b.name, 'th'));

        if (items.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--color-muted);">
                    <i data-lucide="package-search" style="width: 48px; height: 48px; margin: 0 auto 1rem auto; opacity: 0.5;"></i>
                    <h3 style="font-weight: 700; font-size: 1.2rem;">ไม่พบคอลเลกชันกระเป๋าที่ตรงกับเงื่อนไข</h3>
                </div>
            `;
            this.initIcons();
            return;
        }

        grid.innerHTML = items.map(prod => {
            const badgeClass = prod.badge ? `badge-${prod.badge.toLowerCase()}` : '';
            return `
                <div class="storefront-card" data-id="${prod.id}">
                    <div class="storefront-card-image-wrap" data-id="${prod.id}">
                        <img src="${prod.image_url}" alt="${prod.name_th}" class="storefront-card-image" loading="lazy">
                        <div class="storefront-card-badges">
                            ${prod.badge ? `<span class="badge ${badgeClass}">${prod.badge}</span>` : ''}
                        </div>
                        <button class="storefront-card-quickview" data-id="${prod.id}">
                            ดูรายละเอียด
                        </button>
                    </div>
                    <div class="storefront-card-body">
                        <div class="storefront-card-cat">${prod.category}</div>
                        <h3 class="storefront-card-title">${prod.name_th || prod.name}</h3>
                        <p class="storefront-card-desc">${prod.description || ''}</p>
                        <div class="storefront-card-footer">
                            <div class="storefront-card-price">${formatTHB(prod.price)}</div>
                            <button class="btn-add-storefront" data-id="${prod.id}">
                                <i data-lucide="shopping-bag"></i>
                                <span>สั่งซื้อ</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Bind quickview & add to cart
        grid.querySelectorAll('.storefront-card-image-wrap, .storefront-card-quickview').forEach(el => {
            el.addEventListener('click', () => {
                const prod = this.products.find(p => p.id === el.dataset.id);
                if (prod) this.openProductDetailModal(prod);
            });
        });

        grid.querySelectorAll('.btn-add-storefront').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const prod = this.products.find(p => p.id === btn.dataset.id);
                if (prod) {
                    this.pos.addToCart(prod, 1);
                    this.switchView('pos');
                }
            });
        });

        this.initIcons();
    }

    // =========================================================================
    // 👜 PRODUCT DETAIL MODAL (STOREFRONT)
    // =========================================================================
    bindProductDetailModal() {
        const modal = document.getElementById('modal-product-detail');
        const closeBtn = document.getElementById('btn-close-detail');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.classList.remove('open'));
        }
    }

    openProductDetailModal(prod) {
        const modal = document.getElementById('modal-product-detail');
        const title = document.getElementById('detail-modal-title');
        const body = document.getElementById('detail-modal-body');
        if (!modal || !body) return;

        title.textContent = prod.name_th || prod.name;
        const badgeClass = prod.badge ? `badge-${prod.badge.toLowerCase()}` : '';

        body.innerHTML = `
            <div class="detail-modal-layout">
                <div class="detail-img-container">
                    <img src="${prod.image_url}" alt="${prod.name_th}" class="detail-img">
                </div>
                <div class="detail-info">
                    <div style="display: flex; gap: 8px; margin-bottom: 8px; align-items: center;">
                        <span style="font-size: 0.8rem; color: var(--color-muted); font-weight: 700;">SKU: ${prod.sku}</span>
                        ${prod.badge ? `<span class="badge ${badgeClass}">${prod.badge}</span>` : ''}
                    </div>
                    <h2 style="font-size: 1.6rem; font-weight: 800; line-height: 1.25; margin-bottom: 0.5rem;">${prod.name_th}</h2>
                    <h4 style="font-size: 1rem; color: var(--color-muted); font-weight: 500; margin-bottom: 1rem;">${prod.name}</h4>
                    
                    <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1rem;">
                        ${formatTHB(prod.price)}
                    </div>

                    <p style="font-size: 0.95rem; color: var(--color-dark); line-height: 1.6; margin-bottom: 1.25rem;">
                        ${prod.description || 'กระเป๋าดีไซน์พรีเมียมจากคอลเลกชันสัมภาระ (Sampha Ra)'}
                    </p>

                    <div class="detail-specs-table">
                        <div class="detail-spec-row">
                            <span class="detail-spec-label">วัสดุหลัก (Material):</span>
                            <span class="detail-spec-val">${prod.material || 'หนังแท้พรีเมียม'}</span>
                        </div>
                        <div class="detail-spec-row">
                            <span class="detail-spec-label">ขนาดกระเป๋า (Dimensions):</span>
                            <span class="detail-spec-val">${prod.dimensions || '-'}</span>
                        </div>
                        <div class="detail-spec-row">
                            <span class="detail-spec-label">สี (Color):</span>
                            <span class="detail-spec-val">${prod.color || 'Standard'}</span>
                        </div>
                        <div class="detail-spec-row">
                            <span class="detail-spec-label">สถานะสินค้า:</span>
                            <span class="detail-spec-val" style="color: ${prod.stock > 0 ? 'var(--color-success)' : 'var(--color-danger)'};">
                                ${prod.stock > 0 ? `พร้อมส่ง (คงเหลือ ${prod.stock} ชิ้น)` : 'สินค้าหมดชั่วคราว'}
                            </span>
                        </div>
                    </div>

                    <div style="margin-top: auto; display: flex; gap: 1rem;">
                        <button class="btn btn-primary" id="btn-detail-add-cart" style="flex: 1; padding: 0.85rem;" ${prod.stock <= 0 ? 'disabled' : ''}>
                            <i data-lucide="shopping-cart"></i>
                            <span>ใส่ตะกร้าและไปที่หน้าแคชเชียร์</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        const addBtn = body.querySelector('#btn-detail-add-cart');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.pos.addToCart(prod, 1);
                modal.classList.remove('open');
                this.switchView('pos');
            });
        }

        modal.classList.add('open');
        this.initIcons();
    }

    // =========================================================================
    // 📦 INVENTORY & PRODUCT FORM
    // =========================================================================
    bindInventoryControls() {
        const addBtn = document.getElementById('btn-add-new-product');
        const modal = document.getElementById('modal-product-form');
        const closeBtn = document.getElementById('btn-close-product-form');
        const cancelBtn = document.getElementById('btn-cancel-product-form');
        const form = document.getElementById('product-form');

        const closeModal = () => modal.classList.remove('open');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.inventory.currentEditProduct = null;
                document.getElementById('product-form-title').innerHTML = '<i data-lucide="plus-circle"></i><span>เพิ่มสินค้ากระเป๋าใหม่</span>';
                form.reset();
                modal.classList.add('open');
                this.initIcons();
            });
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = {
                    name_th: document.getElementById('prod-form-name-th').value,
                    name: document.getElementById('prod-form-name').value,
                    sku: document.getElementById('prod-form-sku').value,
                    category: document.getElementById('prod-form-category').value,
                    price: Number(document.getElementById('prod-form-price').value),
                    cost_price: Number(document.getElementById('prod-form-cost').value || 0),
                    stock: Number(document.getElementById('prod-form-stock').value),
                    badge: document.getElementById('prod-form-badge').value,
                    image_url: document.getElementById('prod-form-image').value,
                    material: document.getElementById('prod-form-material').value,
                    dimensions: document.getElementById('prod-form-dimensions').value,
                    description: document.getElementById('prod-form-desc').value
                };

                const ok = await this.inventory.saveProduct(formData);
                if (ok) {
                    closeModal();
                    await this.loadProducts();
                }
            });
        }
    }

    renderInventoryTable() {
        const tbody = document.getElementById('inventory-table-body');
        if (!tbody) return;

        if (this.products.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem;">ไม่มีข้อมูลสินค้า</td></tr>`;
            return;
        }

        tbody.innerHTML = this.products.map(prod => `
            <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 0.75rem 1rem;">
                    <img src="${prod.image_url}" alt="${prod.name_th}" style="width: 48px; height: 48px; object-fit: cover; border-radius: var(--radius-sm);">
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 700;">${prod.sku}</td>
                <td style="padding: 0.75rem 1rem;">
                    <div style="font-weight: 700;">${prod.name_th}</div>
                    <small style="color: var(--color-muted);">${prod.name}</small>
                </td>
                <td style="padding: 0.75rem 1rem;"><span class="badge" style="background: var(--color-bg);">${prod.category}</span></td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--color-primary);">${formatTHB(prod.price)}</td>
                <td style="padding: 0.75rem 1rem;">
                    <input type="number" class="form-input quick-stock-input" data-id="${prod.id}" value="${prod.stock}" style="width: 80px; padding: 4px 8px; font-weight: 700;">
                </td>
                <td style="padding: 0.75rem 1rem; text-align: right;">
                    <button class="btn btn-secondary btn-edit-prod" data-id="${prod.id}" style="padding: 4px 10px; font-size: 0.8rem; margin-right: 4px;">แก้ไข</button>
                    <button class="btn btn-danger btn-del-prod" data-id="${prod.id}" data-name="${prod.name_th}" style="padding: 4px 10px; font-size: 0.8rem;">ลบ</button>
                </td>
            </tr>
        `).join('');

        // Bind quick stock change
        tbody.querySelectorAll('.quick-stock-input').forEach(input => {
            input.addEventListener('change', () => {
                this.inventory.quickUpdateStock(input.dataset.id, input.value);
            });
        });

        // Bind edit
        tbody.querySelectorAll('.btn-edit-prod').forEach(btn => {
            btn.addEventListener('click', () => {
                const prod = this.products.find(p => p.id === btn.dataset.id);
                if (prod) this.openEditProductModal(prod);
            });
        });

        // Bind delete
        tbody.querySelectorAll('.btn-del-prod').forEach(btn => {
            btn.addEventListener('click', async () => {
                await this.inventory.deleteProduct(btn.dataset.id, btn.dataset.name);
                await this.loadProducts();
            });
        });
    }

    openEditProductModal(prod) {
        this.inventory.currentEditProduct = prod;
        const modal = document.getElementById('modal-product-form');
        document.getElementById('product-form-title').innerHTML = '<i data-lucide="edit"></i><span>แก้ไขข้อมูลกระเป๋า</span>';

        document.getElementById('prod-form-name-th').value = prod.name_th || '';
        document.getElementById('prod-form-name').value = prod.name || '';
        document.getElementById('prod-form-sku').value = prod.sku || '';
        document.getElementById('prod-form-category').value = prod.category || 'tote';
        document.getElementById('prod-form-price').value = prod.price || 0;
        document.getElementById('prod-form-cost').value = prod.cost_price || 0;
        document.getElementById('prod-form-stock').value = prod.stock || 0;
        document.getElementById('prod-form-badge').value = prod.badge || '';
        document.getElementById('prod-form-image').value = prod.image_url || '';
        document.getElementById('prod-form-material').value = prod.material || '';
        document.getElementById('prod-form-dimensions').value = prod.dimensions || '';
        document.getElementById('prod-form-desc').value = prod.description || '';

        modal.classList.add('open');
        this.initIcons();
    }

    // =========================================================================
    // 📊 REPORTS & DASHBOARD
    // =========================================================================
    async renderReports() {
        await this.reports.loadOrders();
        const summary = this.reports.getDailySummary();

        const todaySalesEl = document.getElementById('report-today-sales');
        const todayOrdersEl = document.getElementById('report-today-orders');
        const avgTicketEl = document.getElementById('report-avg-ticket');

        const payPromptPayEl = document.getElementById('report-pay-promptpay');
        const payCashEl = document.getElementById('report-pay-cash');
        const payCardEl = document.getElementById('report-pay-card');

        if (todaySalesEl) todaySalesEl.textContent = formatTHB(summary.totalSales);
        if (todayOrdersEl) todayOrdersEl.textContent = `${summary.orderCount} บิล`;
        if (avgTicketEl) avgTicketEl.textContent = formatTHB(summary.avgTicket);

        if (payPromptPayEl) payPromptPayEl.textContent = formatTHB(summary.byPayment.promptpay);
        if (payCashEl) payCashEl.textContent = formatTHB(summary.byPayment.cash);
        if (payCardEl) payCardEl.textContent = formatTHB(summary.byPayment.card);

        // Orders Table
        const tbody = document.getElementById('orders-history-tbody');
        if (!tbody) return;

        if (this.reports.orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--color-muted);">ยังไม่มีประวัติการขาย</td></tr>`;
            return;
        }

        tbody.innerHTML = this.reports.orders.map(order => `
            <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 0.75rem 1rem; font-weight: 700;">${order.order_number}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-muted);">${formatDateTime(order.created_at)}</td>
                <td style="padding: 0.75rem 1rem;">${order.customer_name || 'Walk-in'}</td>
                <td style="padding: 0.75rem 1rem;"><span class="badge" style="background: var(--color-bg);">${order.payment_method}</span></td>
                <td style="padding: 0.75rem 1rem; text-align: right; font-weight: 700; color: var(--color-primary);">${formatTHB(order.total_amount)}</td>
                <td style="padding: 0.75rem 1rem; text-align: center;">
                    <button class="btn btn-secondary btn-view-receipt" data-ord="${order.order_number}" style="padding: 4px 8px; font-size: 0.75rem;">
                        ดูสลิป
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.btn-view-receipt').forEach(btn => {
            btn.addEventListener('click', () => {
                const ord = this.reports.orders.find(o => o.order_number === btn.dataset.ord);
                if (ord) {
                    this.renderReceipt(ord);
                    document.getElementById('modal-receipt').classList.add('open');
                }
            });
        });
    }

    // =========================================================================
    // ⚡ SUPABASE DATABASE MODAL & SYNC
    // =========================================================================
    bindSupabaseModal() {
        const modal = document.getElementById('modal-supabase');
        const openBtn = document.getElementById('btn-open-supabase');
        const closeBtn = document.getElementById('btn-close-supabase');
        const urlInput = document.getElementById('supabase-url-input');
        const keyInput = document.getElementById('supabase-key-input');
        const testBtn = document.getElementById('btn-test-supabase');
        const saveBtn = document.getElementById('btn-save-supabase');
        const seedBtn = document.getElementById('btn-seed-supabase');

        if (openBtn) {
            openBtn.addEventListener('click', () => {
                const config = db.getConfig();
                if (urlInput) urlInput.value = config.url;
                if (keyInput) keyInput.value = config.key;
                modal.classList.add('open');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.classList.remove('open'));
        }

        if (testBtn) {
            testBtn.addEventListener('click', async () => {
                testBtn.disabled = true;
                testBtn.innerHTML = 'กำลังทดสอบ...';
                try {
                    const res = await db.testConnection(urlInput.value.trim(), keyInput.value.trim());
                    showToast(res.warning || 'เชื่อมต่อ Supabase สำเร็จ!', res.warning ? 'warning' : 'success', 'Supabase Status');
                } catch (err) {
                    showToast(err.message, 'error', 'เชื่อมต่อไม่สำเร็จ');
                } finally {
                    testBtn.disabled = false;
                    testBtn.innerHTML = '<i data-lucide="activity"></i><span>ทดสอบเชื่อมต่อ</span>';
                    this.initIcons();
                }
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', async () => {
                db.saveConfig(urlInput.value.trim(), keyInput.value.trim());
                this.updateSupabaseStatusIndicator();
                showToast('บันทึกการตั้งค่า Supabase เรียบร้อย', 'success');
                modal.classList.remove('open');
                await this.loadProducts();
            });
        }

        if (seedBtn) {
            seedBtn.addEventListener('click', async () => {
                seedBtn.disabled = true;
                seedBtn.innerHTML = 'กำลังนำเข้าข้อมูล...';
                try {
                    const res = await db.seedToSupabase();
                    showToast(`นำเข้าสินค้ากระเป๋า ${res.count} รายการสู่ Supabase สำเร็จ!`, 'success');
                    await this.loadProducts();
                } catch (err) {
                    showToast(err.message, 'error', 'ไม่สามารถนำเข้าข้อมูลได้');
                } finally {
                    seedBtn.disabled = false;
                    seedBtn.innerHTML = '<i data-lucide="upload-cloud"></i><span>นำเข้าสินค้า 50 รายการเข้า Supabase</span>';
                    this.initIcons();
                }
            });
        }
    }

    updateSupabaseStatusIndicator() {
        const dot = document.getElementById('supabase-status-dot');
        const config = db.getConfig();
        if (dot) {
            dot.classList.toggle('connected', config.isConnected);
            dot.title = config.isConnected ? 'เชื่อมต่อ Supabase แล้ว' : 'ทำงานในโหมด Offline / LocalStorage';
        }
    }

    // =========================================================================
    // 🌙 THEME TOGGLE
    // =========================================================================
    bindThemeToggle() {
        const themeBtn = document.getElementById('btn-toggle-theme');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                themeBtn.innerHTML = `<i data-lucide="${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
                this.initIcons();
            });
        }
    }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
