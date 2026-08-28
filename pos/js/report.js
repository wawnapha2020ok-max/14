// ==============================================================================
// 📊 SALES REPORTS & ORDER HISTORY - Sampha Ra (สัมภาระ)
// ==============================================================================

import { db } from './supabaseClient.js';
import { formatTHB, formatDateTime } from './utils.js';

export class ReportManager {
    constructor() {
        this.orders = [];
    }

    async loadOrders() {
        this.orders = await db.getOrders(100);
        return this.orders;
    }

    getDailySummary() {
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = this.orders.filter(order => {
            const orderDate = new Date(order.created_at).toISOString().split('T')[0];
            return orderDate === today;
        });

        const totalSales = todayOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
        const orderCount = todayOrders.length;
        const avgTicket = orderCount > 0 ? totalSales / orderCount : 0;

        const byPayment = {
            promptpay: 0,
            cash: 0,
            card: 0
        };

        todayOrders.forEach(o => {
            const method = (o.payment_method || 'promptpay').toLowerCase();
            if (byPayment[method] !== undefined) {
                byPayment[method] += Number(o.total_amount) || 0;
            }
        });

        return {
            today,
            totalSales,
            orderCount,
            avgTicket,
            byPayment,
            todayOrders
        };
    }

    getAllTimeSummary() {
        const totalSales = this.orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
        const orderCount = this.orders.length;
        return {
            totalSales,
            orderCount
        };
    }
}
