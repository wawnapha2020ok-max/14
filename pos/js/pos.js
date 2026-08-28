// ==============================================================================
// 💳 POS CASHIER & CART LOGIC - Sampha Ra (สัมภาระ)
// ==============================================================================

import { formatTHB, formatDateTime, generateOrderNumber, generatePromptPayPayload, sounds, showToast, launchConfetti } from './utils.js';
import { db } from './supabaseClient.js';

export class POSManager {
    constructor(onCartUpdated = null, onOrderCompleted = null) {
        this.cart = [];
        this.discountType = 'fixed'; // 'fixed' (THB) or 'percent' (%)
        this.discountValue = 0;
        this.appliedCoupon = null;
        this.vatRate = 0.07; // 7% VAT
        this.includeVat = true;
        this.currentPaymentMethod = 'promptpay';
        this.cashReceived = 0;
        this.promptPayAccount = '0891234567'; // Default demo store PromptPay phone
        this.merchantName = 'Sampha Ra Boutique';

        this.onCartUpdated = onCartUpdated;
        this.onOrderCompleted = onOrderCompleted;

        this.lastCompletedOrder = null;
    }

    /**
     * Add product to cart
     */
    addToCart(product, quantity = 1) {
        if (!product) return;

        // Check if out of stock
        if (product.stock <= 0) {
            showToast(`สินค้า "${product.name_th || product.name}" สินค้าหมดสต็อก`, 'warning', 'สต็อกไม่เพียงพอ');
            return;
        }

        const existingIndex = this.cart.findIndex(item => item.id === product.id);

        if (existingIndex > -1) {
            const newQty = this.cart[existingIndex].quantity + quantity;
            if (newQty > product.stock) {
                showToast(`สต็อกคงเหลือ ${product.stock} ชิ้น ไม่สามารถเพิ่มได้อีก`, 'warning', 'จำกัดสต็อก');
                return;
            }
            this.cart[existingIndex].quantity = newQty;
        } else {
            this.cart.push({
                id: product.id,
                sku: product.sku,
                name: product.name,
                name_th: product.name_th || product.name,
                price: Number(product.price),
                quantity: Math.min(quantity, product.stock),
                stock: product.stock,
                image_url: product.image_url,
                category: product.category
            });
        }

        sounds.beep();
        this.notifyCartChange();
        showToast(`เพิ่ม "${product.name_th || product.name}" ลงในตะกร้าแล้ว`, 'success');
    }

    /**
     * Update quantity by delta (+1 or -1)
     */
    updateQuantity(productId, delta) {
        const item = this.cart.find(i => i.id === productId);
        if (!item) return;

        const newQty = item.quantity + delta;
        if (newQty <= 0) {
            this.removeFromCart(productId);
            return;
        }

        if (newQty > item.stock) {
            showToast(`สต็อกคงเหลือ ${item.stock} ชิ้น`, 'warning', 'จำกัดสต็อก');
            return;
        }

        item.quantity = newQty;
        sounds.beep();
        this.notifyCartChange();
    }

    /**
     * Remove item completely from cart
     */
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.notifyCartChange();
        showToast('ลบรายการออกจากตะกร้าแล้ว', 'info');
    }

    /**
     * Clear all items in cart
     */
    clearCart() {
        if (this.cart.length === 0) return;
        this.cart = [];
        this.discountValue = 0;
        this.appliedCoupon = null;
        this.notifyCartChange();
        showToast('ล้างตะกร้าสินค้าเรียบร้อย', 'info');
    }

    /**
     * Apply Discount or Coupon code
     */
    applyCoupon(code) {
        const cleanCode = (code || '').trim().toUpperCase();
        if (!cleanCode) return false;

        if (cleanCode === 'SAMPHA10' || cleanCode === 'WELCOME10') {
            this.discountType = 'percent';
            this.discountValue = 10;
            this.appliedCoupon = cleanCode;
            showToast('ใช้โค้ดส่วนลด 10% สำเร็จ!', 'success', 'โค้ดส่วนลด');
        } else if (cleanCode === 'VIP500' || cleanCode === 'DISCOUNT500') {
            this.discountType = 'fixed';
            this.discountValue = 500;
            this.appliedCoupon = cleanCode;
            showToast('ใช้โค้ดส่วนลด ฿500 สำเร็จ!', 'success', 'โค้ดส่วนลด');
        } else if (cleanCode === 'BAG20') {
            this.discountType = 'percent';
            this.discountValue = 20;
            this.appliedCoupon = cleanCode;
            showToast('ใช้โค้ดส่วนลด 20% สำเร็จ!', 'success', 'โค้ดส่วนลด');
        } else {
            showToast('โค้ดส่วนลดไม่ถูกต้องหรือหมดอายุ', 'error', 'ไม่พบโค้ด');
            return false;
        }

        this.notifyCartChange();
        return true;
    }

    /**
     * Calculate financial totals
     */
    calculateTotals() {
        const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const itemCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);

        let discountAmount = 0;
        if (this.discountType === 'percent') {
            discountAmount = (subtotal * this.discountValue) / 100;
        } else {
            discountAmount = Math.min(this.discountValue, subtotal);
        }

        const netAfterDiscount = Math.max(0, subtotal - discountAmount);
        
        let vat = 0;
        let total = netAfterDiscount;

        // In Thailand, retail prices usually already include VAT 7%
        // We calculate internal VAT amount (Included in Total): total * 7 / 107
        if (this.includeVat) {
            vat = (netAfterDiscount * 7) / 107;
        }

        return {
            subtotal,
            discount: discountAmount,
            vat,
            total,
            itemCount
        };
    }

    /**
     * Process & finalize payment
     */
    async processPayment(customerInfo = {}) {
        if (this.cart.length === 0) {
            showToast('ไม่มีสินค้าในตะกร้า', 'warning');
            return null;
        }

        const totals = this.calculateTotals();
        let change = 0;

        if (this.currentPaymentMethod === 'cash') {
            if (this.cashReceived < totals.total) {
                showToast(`ยอดเงินสดไม่พอ ขาดอีก ${formatTHB(totals.total - this.cashReceived)}`, 'error', 'ยอดเงินไม่เพียงพอ');
                return null;
            }
            change = this.cashReceived - totals.total;
        } else {
            this.cashReceived = totals.total;
            change = 0;
        }

        const orderNumber = generateOrderNumber();
        const orderData = {
            order_number: orderNumber,
            customer_name: customerInfo.name || 'หน้าร้าน (Walk-in)',
            customer_phone: customerInfo.phone || '',
            subtotal: totals.subtotal,
            discount: totals.discount,
            vat: totals.vat,
            total_amount: totals.total,
            amount_received: this.cashReceived,
            change_amount: change,
            payment_method: this.currentPaymentMethod,
            payment_status: 'paid',
            cashier_name: 'Cashier 01',
            notes: customerInfo.notes || ''
        };

        try {
            // Save to database
            const savedOrder = await db.createOrder(orderData, this.cart);
            this.lastCompletedOrder = {
                ...orderData,
                items: [...this.cart],
                created_at: new Date().toISOString()
            };

            // Play sound and celebrate
            sounds.cashSuccess();
            launchConfetti();
            showToast(`ชำระเงินสำเร็จ บิล #${orderNumber}`, 'success', 'ทำรายการสำเร็จ');

            // Clear current cart
            this.cart = [];
            this.discountValue = 0;
            this.appliedCoupon = null;
            this.cashReceived = 0;
            this.notifyCartChange();

            if (this.onOrderCompleted) {
                this.onOrderCompleted(this.lastCompletedOrder);
            }

            return this.lastCompletedOrder;
        } catch (error) {
            console.error('Error processing order:', error);
            showToast('เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ', 'error');
            return null;
        }
    }

    notifyCartChange() {
        if (this.onCartUpdated) {
            this.onCartUpdated(this.cart, this.calculateTotals());
        }
    }
}
