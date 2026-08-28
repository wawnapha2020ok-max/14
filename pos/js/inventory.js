// ==============================================================================
// 📦 INVENTORY & PRODUCT MANAGEMENT - Sampha Ra (สัมภาระ)
// ==============================================================================

import { db } from './supabaseClient.js';
import { formatTHB, showToast } from './utils.js';

export class InventoryManager {
    constructor(onProductsChanged = null) {
        this.products = [];
        this.onProductsChanged = onProductsChanged;
        this.currentEditProduct = null;
    }

    async loadProducts() {
        this.products = await db.getProducts();
        if (this.onProductsChanged) {
            this.onProductsChanged(this.products);
        }
        return this.products;
    }

    async saveProduct(formData) {
        try {
            if (this.currentEditProduct && this.currentEditProduct.id) {
                // Update
                const updated = await db.updateProduct(this.currentEditProduct.id, {
                    name: formData.name,
                    name_th: formData.name_th,
                    sku: formData.sku,
                    category: formData.category,
                    price: Number(formData.price),
                    cost_price: Number(formData.cost_price || 0),
                    stock: Number(formData.stock),
                    image_url: formData.image_url,
                    description: formData.description,
                    material: formData.material,
                    dimensions: formData.dimensions,
                    color: formData.color,
                    badge: formData.badge
                });
                showToast(`อัปเดตสินค้า "${formData.name_th || formData.name}" สำเร็จ`, 'success');
            } else {
                // Add new
                const added = await db.addProduct({
                    name: formData.name,
                    name_th: formData.name_th,
                    sku: formData.sku || 'BAG-' + Math.floor(1000 + Math.random() * 9000),
                    category: formData.category,
                    price: Number(formData.price),
                    cost_price: Number(formData.cost_price || 0),
                    stock: Number(formData.stock),
                    image_url: formData.image_url,
                    description: formData.description,
                    material: formData.material,
                    dimensions: formData.dimensions,
                    color: formData.color,
                    badge: formData.badge
                });
                showToast(`เพิ่มสินค้า "${formData.name_th || formData.name}" สำเร็จ`, 'success');
            }

            await this.loadProducts();
            this.currentEditProduct = null;
            return true;
        } catch (error) {
            console.error('Error saving product:', error);
            showToast('เกิดข้อผิดพลาดในการบันทึกสินค้า', 'error');
            return false;
        }
    }

    async deleteProduct(productId, productName) {
        if (confirm(`คุณต้องการลบสินค้า "${productName}" ใช่หรือไม่?`)) {
            try {
                await db.deleteProduct(productId);
                showToast(`ลบสินค้า "${productName}" เรียบร้อยแล้ว`, 'info');
                await this.loadProducts();
                return true;
            } catch (error) {
                console.error('Error deleting product:', error);
                showToast('ไม่สามารถลบสินค้าได้', 'error');
                return false;
            }
        }
        return false;
    }

    async quickUpdateStock(productId, newStock) {
        try {
            await db.updateProduct(productId, { stock: Number(newStock) });
            showToast('ปรับปรุงสต็อกสำเร็จ', 'success');
            await this.loadProducts();
        } catch (err) {
            showToast('ไม่สามารถอัปเดตสต็อกได้', 'error');
        }
    }
}
