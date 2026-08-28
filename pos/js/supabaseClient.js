// ==============================================================================
// ⚡ SUPABASE CLIENT & DATA MANAGER - Sampha Ra (สัมภาระ)
// ==============================================================================

import { INITIAL_PRODUCTS } from './products.js';
import { showToast } from './utils.js';

const STORAGE_KEYS = {
    URL: 'samphara_supabase_url',
    KEY: 'samphara_supabase_anon_key',
    LOCAL_PRODUCTS: 'samphara_local_products_v50',
    LOCAL_ORDERS: 'samphara_local_orders_v1'
};

class SupabaseManager {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.supabaseUrl = localStorage.getItem(STORAGE_KEYS.URL) || '';
        this.supabaseKey = localStorage.getItem(STORAGE_KEYS.KEY) || '';
        this.initClient();
    }

    /**
     * Initialize Supabase client if credentials exist
     */
    initClient() {
        if (this.supabaseUrl && this.supabaseKey && window.supabase) {
            try {
                this.client = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
                this.isConnected = true;
                console.log('⚡ Supabase client initialized:', this.supabaseUrl);
            } catch (err) {
                console.warn('⚠️ Supabase init error, using local storage fallback:', err);
                this.client = null;
                this.isConnected = false;
            }
        } else {
            this.client = null;
            this.isConnected = false;
        }
    }

    /**
     * Test Supabase connection
     */
    async testConnection(url, key) {
        if (!window.supabase) {
            throw new Error('Supabase JS SDK not loaded yet.');
        }
        try {
            const testClient = window.supabase.createClient(url, key);
            // Test query
            const { data, error } = await testClient.from('products').select('count', { count: 'exact', head: true });
            if (error) {
                // Check if table missing or auth error
                if (error.code === '42P01') {
                    return { success: true, warning: 'Connected, but "products" table not found. Please run supabase_schema.sql first!' };
                }
                throw error;
            }
            return { success: true, message: 'Connection successful!' };
        } catch (error) {
            console.error('Supabase test connection error:', error);
            throw new Error(error.message || 'Cannot connect to Supabase. Check URL and Anon Key.');
        }
    }

    /**
     * Save Supabase configuration
     */
    saveConfig(url, key) {
        this.supabaseUrl = (url || '').trim();
        this.supabaseKey = (key || '').trim();

        if (this.supabaseUrl && this.supabaseKey) {
            localStorage.setItem(STORAGE_KEYS.URL, this.supabaseUrl);
            localStorage.setItem(STORAGE_KEYS.KEY, this.supabaseKey);
            this.initClient();
        } else {
            localStorage.removeItem(STORAGE_KEYS.URL);
            localStorage.removeItem(STORAGE_KEYS.KEY);
            this.client = null;
            this.isConnected = false;
        }
    }

    getConfig() {
        return {
            url: this.supabaseUrl,
            key: this.supabaseKey,
            isConnected: this.isConnected
        };
    }

    // ==========================================
    // 📦 PRODUCTS API
    // ==========================================

    /**
     * Fetch all active products
     */
    async getProducts() {
        if (this.isConnected && this.client) {
            try {
                const { data, error } = await this.client
                    .from('products')
                    .select('*')
                    .eq('is_active', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data && data.length > 0) {
                    // Update local cache as backup
                    localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(data));
                    return data;
                } else {
                    console.log('No products in Supabase table yet, showing seed data');
                    return this.getLocalProducts();
                }
            } catch (err) {
                console.warn('Error fetching from Supabase, fallback to local:', err);
                return this.getLocalProducts();
            }
        }
        return this.getLocalProducts();
    }

    /**
     * Add a new product
     */
    async addProduct(product) {
        const newProduct = {
            id: product.id || 'prod-' + Date.now(),
            sku: product.sku || 'BAG-' + Math.floor(1000 + Math.random() * 9000),
            name: product.name,
            name_th: product.name_th || product.name,
            category: product.category || 'tote',
            price: Number(product.price) || 0,
            cost_price: Number(product.cost_price) || 0,
            stock: Number(product.stock) || 0,
            image_url: product.image_url || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            description: product.description || '',
            material: product.material || 'หนังแท้พรีเมียม',
            dimensions: product.dimensions || '30 x 20 x 10 cm',
            color: product.color || 'Default',
            badge: product.badge || '',
            is_active: true,
            created_at: new Date().toISOString()
        };

        if (this.isConnected && this.client) {
            try {
                const { data, error } = await this.client
                    .from('products')
                    .insert([newProduct])
                    .select()
                    .single();

                if (error) throw error;
                this.updateLocalProductCache(data || newProduct, 'add');
                return data || newProduct;
            } catch (err) {
                console.warn('Supabase add error, saving locally:', err);
            }
        }

        this.updateLocalProductCache(newProduct, 'add');
        return newProduct;
    }

    /**
     * Update product details or stock
     */
    async updateProduct(id, updates) {
        if (this.isConnected && this.client) {
            try {
                const { data, error } = await this.client
                    .from('products')
                    .update(updates)
                    .eq('id', id)
                    .select()
                    .single();

                if (error) throw error;
                this.updateLocalProductCache(data || { id, ...updates }, 'update');
                return data || { id, ...updates };
            } catch (err) {
                console.warn('Supabase update error, saving locally:', err);
            }
        }

        this.updateLocalProductCache({ id, ...updates }, 'update');
        return { id, ...updates };
    }

    /**
     * Delete product (soft delete or hard delete)
     */
    async deleteProduct(id) {
        if (this.isConnected && this.client) {
            try {
                const { error } = await this.client
                    .from('products')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
            } catch (err) {
                console.warn('Supabase delete error, removing locally:', err);
            }
        }
        this.updateLocalProductCache({ id }, 'delete');
        return true;
    }

    /**
     * Seed Initial Products into Supabase
     */
    async seedToSupabase() {
        if (!this.isConnected || !this.client) {
            throw new Error('กรุณาเชื่อมต่อ Supabase ให้เรียบร้อยก่อนทำการนำเข้าข้อมูล');
        }

        try {
            // Strip client-side custom ID format if needed or insert as is
            const productsToInsert = INITIAL_PRODUCTS.map(p => ({
                sku: p.sku,
                name: p.name,
                name_th: p.name_th,
                category: p.category,
                price: p.price,
                cost_price: p.cost_price,
                stock: p.stock,
                image_url: p.image_url,
                description: p.description,
                material: p.material,
                dimensions: p.dimensions,
                color: p.color,
                badge: p.badge,
                is_active: true
            }));

            const { data, error } = await this.client
                .from('products')
                .upsert(productsToInsert, { onConflict: 'sku' })
                .select();

            if (error) throw error;
            return { count: data ? data.length : productsToInsert.length };
        } catch (err) {
            console.error('Seed error:', err);
            throw new Error(err.message || 'เกิดข้อผิดพลาดในการนำเข้าข้อมูล');
        }
    }

    // ==========================================
    // 🛒 ORDERS API
    // ==========================================

    /**
     * Create a new sales order & reduce product stock
     */
    async createOrder(order, items) {
        const orderData = {
            id: order.id || 'ord-' + Date.now(),
            order_number: order.order_number,
            customer_name: order.customer_name || 'หน้าร้าน (Walk-in)',
            customer_phone: order.customer_phone || '',
            subtotal: Number(order.subtotal) || 0,
            discount: Number(order.discount) || 0,
            vat: Number(order.vat) || 0,
            total_amount: Number(order.total_amount) || 0,
            amount_received: Number(order.amount_received) || 0,
            change_amount: Number(order.change_amount) || 0,
            payment_method: order.payment_method || 'promptpay',
            payment_status: 'paid',
            cashier_name: order.cashier_name || 'Cashier 01',
            notes: order.notes || '',
            created_at: new Date().toISOString()
        };

        if (this.isConnected && this.client) {
            try {
                // 1. Insert order
                const { data: createdOrder, error: orderErr } = await this.client
                    .from('orders')
                    .insert([orderData])
                    .select()
                    .single();

                if (orderErr) throw orderErr;

                // 2. Insert order items
                const orderId = createdOrder ? createdOrder.id : orderData.id;
                const itemsData = items.map(item => ({
                    order_id: orderId,
                    product_id: item.product_id || item.id,
                    product_name: item.name_th || item.name,
                    sku: item.sku,
                    price: Number(item.price),
                    quantity: Number(item.quantity),
                    subtotal: Number(item.price) * Number(item.quantity)
                }));

                const { error: itemsErr } = await this.client
                    .from('order_items')
                    .insert(itemsData);

                if (itemsErr) console.warn('Error inserting order items:', itemsErr);

                // 3. Decrement stock for each item in Supabase
                for (const item of items) {
                    if (item.id) {
                        try {
                            const newStock = Math.max(0, (item.currentStock || item.stock || 0) - item.quantity);
                            await this.client
                                .from('products')
                                .update({ stock: newStock })
                                .eq('id', item.id);
                        } catch (stkErr) {
                            console.warn('Stock update error for item:', item.name, stkErr);
                        }
                    }
                }

                this.saveLocalOrder({ ...orderData, items });
                return createdOrder || orderData;
            } catch (err) {
                console.warn('Supabase order creation error, saving locally:', err);
            }
        }

        // Local fallback
        this.saveLocalOrder({ ...orderData, items });
        // Deduct local stock
        const localProds = this.getLocalProducts();
        for (const item of items) {
            const prod = localProds.find(p => p.id === item.id || p.sku === item.sku);
            if (prod) {
                prod.stock = Math.max(0, (prod.stock || 0) - item.quantity);
            }
        }
        localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(localProds));

        return { ...orderData, items };
    }

    /**
     * Fetch orders history
     */
    async getOrders(limit = 50) {
        if (this.isConnected && this.client) {
            try {
                const { data, error } = await this.client
                    .from('orders')
                    .select('*, order_items(*)')
                    .order('created_at', { ascending: false })
                    .limit(limit);

                if (error) throw error;
                if (data) return data;
            } catch (err) {
                console.warn('Supabase fetch orders error, fallback to local:', err);
            }
        }
        return this.getLocalOrders();
    }

    // ==========================================
    // 🗄️ LOCAL STORAGE FALLBACK HELPERS
    // ==========================================

    getLocalProducts() {
        const stored = localStorage.getItem(STORAGE_KEYS.LOCAL_PRODUCTS);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error(e);
            }
        }
        // Initialize with default bag products
        localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
    }

    updateLocalProductCache(product, action = 'update') {
        let products = this.getLocalProducts();
        if (action === 'add') {
            products.unshift(product);
        } else if (action === 'update') {
            products = products.map(p => p.id === product.id ? { ...p, ...product } : p);
        } else if (action === 'delete') {
            products = products.filter(p => p.id !== product.id);
        }
        localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(products));
    }

    getLocalOrders() {
        const stored = localStorage.getItem(STORAGE_KEYS.LOCAL_ORDERS);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error(e);
            }
        }
        return [];
    }

    saveLocalOrder(order) {
        const orders = this.getLocalOrders();
        orders.unshift(order);
        localStorage.setItem(STORAGE_KEYS.LOCAL_ORDERS, JSON.stringify(orders));
    }
}

export const db = new SupabaseManager();
