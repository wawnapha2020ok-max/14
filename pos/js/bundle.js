// ==============================================================================
// 👜 SAMPHA RA (สัมภาระ) - ALL-IN-ONE BUNDLE (Zero CORS / File Protocol Friendly)
// ==============================================================================

(function() {
    'use strict';

    // ==========================================
    // 1. DATA & CONSTANTS (50 Fashion Bags)
    // ==========================================
    const INITIAL_CATEGORIES = [
        { id: 'all', name: 'All Bags', name_th: 'กระเป๋าทั้งหมด', icon: 'layout-grid' },
        { id: 'tote', name: 'Tote Bags', name_th: 'กระเป๋าโท้ท', icon: 'shopping-bag' },
        { id: 'crossbody', name: 'Crossbody', name_th: 'กระเป๋าสะพายข้าง', icon: 'shield' },
        { id: 'shoulder', name: 'Shoulder Bags', name_th: 'กระเป๋าสะพายไหล่', icon: 'briefcase' },
        { id: 'backpack', name: 'Backpacks', name_th: 'เป้สะพายหลัง', icon: 'package' },
        { id: 'travel', name: 'Travel Bags', name_th: 'กระเป๋าเดินทาง', icon: 'compass' },
        { id: 'mini', name: 'Mini & Wallets', name_th: 'กระเป๋าสตางค์และมินิ', icon: 'credit-card' }
    ];

    const INITIAL_PRODUCTS = [
        // --- 1. TOTE BAGS (10 items) ---
        {
            id: 'prod-001',
            sku: 'BAG-TOT-01',
            name: 'Sampha Ra Classic Leather Tote',
            name_th: 'กระเป๋าโท้ทหนังแท้คลาสสิก',
            category: 'tote',
            price: 3890.00,
            cost_price: 1950.00,
            stock: 18,
            image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าโท้ทหนังแท้เกรดพรีเมียม สวยหรู จุของได้เยอะ เหมาะสำหรับทำงานและชีวิตประจำวัน',
            material: 'หนังวัวแท้ Grain Leather',
            dimensions: '36 x 28 x 14 cm',
            color: 'Cognac Brown',
            badge: 'BESTSELLER',
            is_active: true
        },
        {
            id: 'prod-002',
            sku: 'BAG-CAN-02',
            name: 'Minimalist Canvas Everyday Bag',
            name_th: 'กระเป๋าผ้าแคนวาสมินิมอล',
            category: 'tote',
            price: 1290.00,
            cost_price: 550.00,
            stock: 35,
            image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าผ้าแคนวาสเนื้อหนา 16oz ทรงมินิมอล ใส่โน้ตบุ๊ก 14 นิ้วได้ มีช่องแยกด้านใน',
            material: 'Heavy Canvas 16oz & Leather Trim',
            dimensions: '38 x 32 x 12 cm',
            color: 'Off-White / Natural',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-003',
            sku: 'BAG-BUC-08',
            name: 'Artisan Woven Bucket Tote',
            name_th: 'กระเป๋าทรงถังงานสานผสมหนัง',
            category: 'tote',
            price: 2150.00,
            cost_price: 950.00,
            stock: 15,
            image_url: 'https://images.unsplash.com/photo-1614179689702-355944cf0918?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าทรงถังลายสานประณีต มีถุงผ้าซับในรูดปิดได้ สไตล์ Natural Chic',
            material: 'Handwoven Raffia & Tan Leather',
            dimensions: '22 x 25 x 15 cm',
            color: 'Natural Raffia',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-004',
            sku: 'BAG-FOL-11',
            name: 'Executive Laptop Folio Bag',
            name_th: 'กระเป๋าใส่แล็ปท็อปหนังเรียบหรู',
            category: 'tote',
            price: 3490.00,
            cost_price: 1600.00,
            stock: 12,
            image_url: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าเอกสารและแล็ปท็อปทรง Slim เรียบหรู เสริมภาพลักษณ์มืออาชีพ',
            material: 'Saffiano Leather',
            dimensions: '39 x 29 x 5 cm',
            color: 'Midnight Navy',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-005',
            sku: 'BAG-TOT-05',
            name: 'Grand Horizon Oversized Shopper',
            name_th: 'กระเป๋าช้อปเปอร์ใบใหญ่จุใจ',
            category: 'tote',
            price: 2890.00,
            cost_price: 1300.00,
            stock: 20,
            image_url: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าช้อปเปอร์ขนาดใหญ่พิเศษ น้ำหนักเบา จุสัมภาระได้ครบครัน เหมาะกับทุกทริป',
            material: 'Premium Vegan Nappa',
            dimensions: '42 x 34 x 16 cm',
            color: 'Caramel Latte',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-006',
            sku: 'BAG-TOT-06',
            name: 'Riviera Straw Beach Tote',
            name_th: 'กระเป๋าสานริเวียร่าสไตล์ซัมเมอร์',
            category: 'tote',
            price: 1890.00,
            cost_price: 800.00,
            stock: 24,
            image_url: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าสานธรรมชาติพร้อมหูหิ้วหนังแท้ สไตล์พักผ่อนริมทะเลและวันสบายๆ',
            material: 'Natural Straw & Calf Leather',
            dimensions: '35 x 30 x 14 cm',
            color: 'Beige Straw & Cognac',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-007',
            sku: 'BAG-TOT-07',
            name: 'Monochrome Canvas Book Tote',
            name_th: 'กระเป๋าบุ๊คโท้ทลายโมโนโครม',
            category: 'tote',
            price: 1650.00,
            cost_price: 700.00,
            stock: 30,
            image_url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าผ้าทรงเหลี่ยมตั้งอยู่ทรง ลายกราฟิกคลาสสิก ใส่หนังสือและไอแพดได้สบาย',
            material: 'Jacquard Fabric & Canvas',
            dimensions: '32 x 26 x 11 cm',
            color: 'Black & Ivory',
            badge: '',
            is_active: true
        },
        {
            id: 'prod-008',
            sku: 'BAG-TOT-08',
            name: 'Oxford Structured Work Tote',
            name_th: 'กระเป๋าทำงานอ็อกซ์ฟอร์ดทรงเป๊ะ',
            category: 'tote',
            price: 4150.00,
            cost_price: 2000.00,
            stock: 14,
            image_url: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าทำงานทรงสุภาพ แบ่ง 3 ช่องใหญ่ ซิปกลางปิดมิดชิด ปกป้องของมีค่า',
            material: 'Epsom Textured Leather',
            dimensions: '37 x 27 x 13 cm',
            color: 'Charcoal Black',
            badge: 'BESTSELLER',
            is_active: true
        },
        {
            id: 'prod-009',
            sku: 'BAG-TOT-09',
            name: 'Pleated Velvet Day Tote',
            name_th: 'กระเป๋าโท้ทผ้ากำมะหยี่อัดพลีท',
            category: 'tote',
            price: 1950.00,
            cost_price: 850.00,
            stock: 16,
            image_url: 'https://images.unsplash.com/photo-1587467512961-120760940315?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าผ้ากำมะหยี่เนื้อนุ่มอัดพลีทลอนสวย สัมผัสหรูหรา น้ำหนักเบาพกพาง่าย',
            material: 'Soft Velvet Pleats',
            dimensions: '34 x 36 x 8 cm',
            color: 'Emerald Green',
            badge: 'LIMITED',
            is_active: true
        },
        {
            id: 'prod-010',
            sku: 'BAG-TOT-10',
            name: 'Soft Leather Slouchy Hobo Tote',
            name_th: 'กระเป๋าโท้ทหนังนุ่มทรง Slouchy',
            category: 'tote',
            price: 3290.00,
            cost_price: 1500.00,
            stock: 19,
            image_url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าหนังทรงทิ้งตัว นุ่มนวลแนบตัว สไตล์มินิมอลญี่ปุ่น สะพายคล่องตัวทุกวัน',
            material: 'Soft Pebble Vegan Leather',
            dimensions: '40 x 30 x 15 cm',
            color: 'Taupe Grey',
            badge: 'NEW',
            is_active: true
        },

        // --- 2. CROSSBODY BAGS (10 items) ---
        {
            id: 'prod-011',
            sku: 'BAG-CRB-03',
            name: 'Urban Crossbody Saddle Bag',
            name_th: 'กระเป๋าสะพายข้างทรงแซดเดิล',
            category: 'crossbody',
            price: 2450.00,
            cost_price: 1100.00,
            stock: 14,
            image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าสะพายข้างทรงแซดเดิล โค้งมน อะไหล่ทองรมดำ ปรับสายสั้นยาวได้',
            material: 'Smooth PU Leather & Gold Hardware',
            dimensions: '24 x 18 x 7 cm',
            color: 'Noir Black',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-012',
            sku: 'BAG-CRB-12',
            name: 'Sunset Mini Box Crossbody',
            name_th: 'กระเป๋าสะพายมินิบ็อกซ์รุ่นพิเศษ',
            category: 'crossbody',
            price: 1890.00,
            cost_price: 800.00,
            stock: 22,
            image_url: 'https://images.unsplash.com/photo-1566150902887-9679ec155ba0?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าทรงกล่องมินิดีไซน์น่ารัก ใส่สมาร์ตโฟนได้ทุกรุ่น ล็อคแม่เหล็กเปิดปิดง่าย',
            material: 'Smooth Box Leather',
            dimensions: '18 x 13 x 6 cm',
            color: 'Terracotta Orange',
            badge: 'LIMITED',
            is_active: true
        },
        {
            id: 'prod-013',
            sku: 'BAG-CRB-13',
            name: 'Metropolitan Camera Bag',
            name_th: 'กระเป๋ากล้องหนังสะพายข้าง',
            category: 'crossbody',
            price: 2190.00,
            cost_price: 950.00,
            stock: 18,
            image_url: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าทรง Camera Bag สปอร์ตแคชชวล มีช่องซิปหน้า 2 ช่อง ใส่กระเป๋าสตางค์และมือถือครบ',
            material: 'Water-resistant Microfiber Leather',
            dimensions: '21 x 15 x 8 cm',
            color: 'Olive Green',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-014',
            sku: 'BAG-CRB-14',
            name: 'Aura Half-Moon Crossbody',
            name_th: 'กระเป๋าสะพายข้างทรงฮาล์ฟมูน',
            category: 'crossbody',
            price: 2650.00,
            cost_price: 1200.00,
            stock: 16,
            image_url: 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=800&q=80',
            description: 'ทรงพระจันทร์ครึ่งดวงสุดเก๋ ฝาพับแม่เหล็กซ่อนด้านใน สายสะพายปรับระดับได้ 5 ระดับ',
            material: 'Smooth Calfskin Vegan Leather',
            dimensions: '23 x 16 x 7 cm',
            color: 'Warm Almond',
            badge: 'BESTSELLER',
            is_active: true
        },
        {
            id: 'prod-015',
            sku: 'BAG-CRB-15',
            name: 'Vintage Postman Leather Messenger',
            name_th: 'กระเป๋าสะพายทรงบุรุษไปรษณีย์วินเทจ',
            category: 'crossbody',
            price: 3490.00,
            cost_price: 1650.00,
            stock: 11,
            image_url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าสะพายหนังฟอกฝาดสไตล์วินเทจ ยิ่งใช้หนังยิ่งเงาสวย ทนทานนานนับสิบปี',
            material: 'Full Grain Waxed Leather',
            dimensions: '28 x 22 x 9 cm',
            color: 'Antique Brown',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-016',
            sku: 'BAG-CRB-16',
            name: 'Nordic Minimalist Phone Bag',
            name_th: 'กระเป๋าสะพายใส่มือถือนอร์ดิก',
            category: 'crossbody',
            price: 990.00,
            cost_price: 390.00,
            stock: 40,
            image_url: 'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าใส่มือถือและบัตรใบกะทัดรัด น้ำหนักเบาพิเศษ พกพาสะดวกในวันชิลๆ',
            material: 'Soft PU Leather',
            dimensions: '12 x 19 x 3 cm',
            color: 'Dusty Mint',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-017',
            sku: 'BAG-CRB-17',
            name: 'Celeste Accordion Crossbody',
            name_th: 'กระเป๋าสะพายข้างทรงหีบเพลง',
            category: 'crossbody',
            price: 2790.00,
            cost_price: 1250.00,
            stock: 15,
            image_url: 'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=800&q=80',
            description: 'ช่องใส่ของแบ่ง 3 พับแบบหีบเพลง จุของได้เป็นระเบียบเรียบร้อย ทรงสวยไม่เสียทรง',
            material: 'Saffiano Leather & Gold Accents',
            dimensions: '22 x 16 x 8 cm',
            color: 'Burgundy Wine',
            badge: '',
            is_active: true
        },
        {
            id: 'prod-018',
            sku: 'BAG-CRB-18',
            name: 'Sport Utility Nylon Sling Bag',
            name_th: 'กระเป๋าสะพายข้างผ้าไนลอนกันน้ำ',
            category: 'crossbody',
            price: 1450.00,
            cost_price: 600.00,
            stock: 28,
            image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าผ้าไนลอนกันน้ำ 100% ซิปกันน้ำ สายสะพายหนานุ่ม สไตล์สตรีทแฟชั่น',
            material: 'Ballistic Nylon 420D',
            dimensions: '26 x 17 x 6 cm',
            color: 'Matte Black',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-019',
            sku: 'BAG-CRB-19',
            name: 'Chic Bohemian Fringe Crossbody',
            name_th: 'กระเป๋าสะพายข้างแต่งพู่โบฮีเมียน',
            category: 'crossbody',
            price: 2290.00,
            cost_price: 980.00,
            stock: 12,
            image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าหนังกลับแต่งพู่ยาวพลิ้วไหว สไตล์โบโฮชิค เข้ากับชุดเดรสและลุคท่องเที่ยว',
            material: 'Genuine Suede Leather',
            dimensions: '20 x 22 x 5 cm',
            color: 'Desert Sand Suede',
            badge: 'LIMITED',
            is_active: true
        },
        {
            id: 'prod-020',
            sku: 'BAG-CRB-20',
            name: 'Prestige Lock Metal Crossbody',
            name_th: 'กระเป๋าสะพายข้างล็อคทองหรู',
            category: 'crossbody',
            price: 3190.00,
            cost_price: 1450.00,
            stock: 14,
            image_url: 'https://images.unsplash.com/photo-1572196298647-45300069b208?auto=format&fit=crop&w=800&q=80',
            description: 'ตัวล็อคโลหะสีทองอร่ามดีไซน์โมเดิร์น หนังลายจระเข้เรียบหรู เสริมความมั่นใจ',
            material: 'Croc-Embossed Vegan Leather',
            dimensions: '25 x 17 x 7 cm',
            color: 'Emerald Croc',
            badge: 'BESTSELLER',
            is_active: true
        },

        // --- 3. SHOULDER BAGS (10 items) ---
        {
            id: 'prod-021',
            sku: 'BAG-SHO-04',
            name: 'Signature Baguette Shoulder Bag',
            name_th: 'กระเป๋าสะพายไหล่ทรงบาแก็ตต์',
            category: 'shoulder',
            price: 3200.00,
            cost_price: 1400.00,
            stock: 10,
            image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าสะพายไหล่ทรงเก๋สไตล์ฝรั่งเศส ให้ลุคเรียบหรูดูแพง น้ำหนักเบาคล่องตัว',
            material: 'Italian Smooth Leather',
            dimensions: '27 x 14 x 6 cm',
            color: 'Caramel Tan',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-022',
            sku: 'BAG-FLA-06',
            name: 'Elegance Quilted Flap Bag',
            name_th: 'กระเป๋าหนังลายควิลต์โซ่ทอง',
            category: 'shoulder',
            price: 3990.00,
            cost_price: 1800.00,
            stock: 12,
            image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าหนังลายควิลต์ประดับสายโซ่ทองหรูหรา ซับในกำมะหยี่ เหมาะสำหรับออกงาน',
            material: 'Lambskin Touch PU & Chain',
            dimensions: '26 x 16 x 8 cm',
            color: 'Champagne Beige',
            badge: 'BESTSELLER',
            is_active: true
        },
        {
            id: 'prod-023',
            sku: 'BAG-HOB-10',
            name: 'Modern Crescent Moon Hobo Bag',
            name_th: 'กระเป๋าทรงพระจันทร์เสี้ยว',
            category: 'shoulder',
            price: 2790.00,
            cost_price: 1250.00,
            stock: 16,
            image_url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าสะพายทรงพระจันทร์เสี้ยว มินิมอลสายเกาหลี หนังนุ่มน้ำหนักเบา จุของครบ',
            material: 'Soft Vegan Leather',
            dimensions: '30 x 20 x 8 cm',
            color: 'Cream Ivory',
            badge: 'BESTSELLER',
            is_active: true
        },
        {
            id: 'prod-024',
            sku: 'BAG-SHO-24',
            name: 'Athena Chain Strap Shoulder Flap',
            name_th: 'กระเป๋าสะพายไหล่สายโซ่เอเธน่า',
            category: 'shoulder',
            price: 3650.00,
            cost_price: 1600.00,
            stock: 14,
            image_url: 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&w=800&q=80',
            description: 'สายโซ่คู่ปรับสะพายเดี่ยวหรือคู่ได้ ฝาพับทรงมน หนังเงาประกายหรูหรา',
            material: 'Glossy Calfskin Leather',
            dimensions: '25 x 15 x 7 cm',
            color: 'Deep Cherry',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-025',
            sku: 'BAG-SHO-25',
            name: 'Parisienne Croissant Leather Bag',
            name_th: 'กระเป๋าหนังทรงครัวซองต์สไตล์ปารีส',
            category: 'shoulder',
            price: 2950.00,
            cost_price: 1350.00,
            stock: 18,
            image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
            description: 'ดีไซน์จับจีบทรงครัวซองต์ยอดฮิต หนังนุ่มมาก ให้ลุคแฟชั่นนิสต้าตัวจริง',
            material: 'Ultra Soft Nappa Leather',
            dimensions: '32 x 18 x 10 cm',
            color: 'Warm Butter / Cream',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-026',
            sku: 'BAG-SHO-26',
            name: 'Vogue Ruched Handle Shoulder Bag',
            name_th: 'กระเป๋าสะพายไหล่สายย่นแฟชั่น',
            category: 'shoulder',
            price: 1990.00,
            cost_price: 850.00,
            stock: 20,
            image_url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
            description: 'สายสะพายไหล่ออกแบบย่นมีมิติ น้ำหนักเบา ดีไซน์ล้ำสมัยใส่กับชุดไหนก็เด่น',
            material: 'Matte Silk Poly & Leather',
            dimensions: '26 x 14 x 6 cm',
            color: 'Lilac Lavender',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-027',
            sku: 'BAG-SHO-27',
            name: 'Royal Heritage Structured Shoulder',
            name_th: 'กระเป๋าสะพายไหล่ทรงเหลี่ยมรอยัล',
            category: 'shoulder',
            price: 4350.00,
            cost_price: 2100.00,
            stock: 8,
            image_url: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าหนังทรงเหลี่ยมตั้งแข็งแรง อะไหล่รมดำพรีเมียม สวยคลาสสิกข้ามกาลเวลา',
            material: 'Hand-dyed Saddle Leather',
            dimensions: '28 x 19 x 8 cm',
            color: 'Ebony Black',
            badge: 'LIMITED',
            is_active: true
        },
        {
            id: 'prod-028',
            sku: 'BAG-SHO-28',
            name: 'Solstice Double-Zip Shoulder Bag',
            name_th: 'กระเป๋าสะพายไหล่ซิปคู่โซลสติซ',
            category: 'shoulder',
            price: 2490.00,
            cost_price: 1100.00,
            stock: 22,
            image_url: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80',
            description: 'ช่องซิปคู่แยกหน้าหลัง จุของได้เยอะ หยิบของสะดวก สายสะพายหนังแบนไม่เจ็บไหล่',
            material: 'Grained Vegan Leather',
            dimensions: '29 x 16 x 9 cm',
            color: 'Sand Beige',
            badge: '',
            is_active: true
        },
        {
            id: 'prod-029',
            sku: 'BAG-SHO-29',
            name: 'Chic Velvet Evening Shoulder Pochette',
            name_th: 'กระเป๋าสะพายไหล่กำมะหยี่ออกงาน',
            category: 'shoulder',
            price: 2250.00,
            cost_price: 950.00,
            stock: 15,
            image_url: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าโพแชตกำมะหยี่เนื้อเงา ประดับคริสตัลที่หัวซิป สวยสะกดทุกสายตาในงานกลางคืน',
            material: 'Silk Velvet & Crystal Zipper',
            dimensions: '24 x 13 x 5 cm',
            color: 'Midnight Navy Velvet',
            badge: 'LIMITED',
            is_active: true
        },
        {
            id: 'prod-030',
            sku: 'BAG-SHO-30',
            name: 'Monogram Tweed Vintage Shoulder',
            name_th: 'กระเป๋าสะพายไหล่ผ้าทวีตโมโนแกรม',
            category: 'shoulder',
            price: 3100.00,
            cost_price: 1350.00,
            stock: 17,
            image_url: 'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?auto=format&fit=crop&w=800&q=80',
            description: 'ผ้าทวีตทอมือลายตารางหรูหรา ขอบหนังแท้สีเบจ สไตล์คุณหนูลักชูรี่',
            material: 'Woven Tweed Fabric & Leather',
            dimensions: '27 x 15 x 6.5 cm',
            color: 'Tweed Ivory & Gold',
            badge: 'HOT',
            is_active: true
        },

        // --- 4. BACKPACKS (6 items) ---
        {
            id: 'prod-031',
            sku: 'BAG-BPK-07',
            name: 'City Explorer Roll-top Backpack',
            name_th: 'เป้สะพายหลังกันน้ำดีไซน์คนเมือง',
            category: 'backpack',
            price: 2890.00,
            cost_price: 1300.00,
            stock: 20,
            image_url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
            description: 'เป้สะพายหลังสไตล์ Roll-top ช่องบุกันกระแทกใส่ Laptop 15.6 นิ้ว กันน้ำ 100%',
            material: 'Cordura 500D Waterproof',
            dimensions: '45 x 30 x 15 cm',
            color: 'Space Grey',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-032',
            sku: 'BAG-BPK-32',
            name: 'Heritage Leather Daypack',
            name_th: 'เป้หนังแท้สไตล์คลาสสิกเดย์แพ็ค',
            category: 'backpack',
            price: 4890.00,
            cost_price: 2300.00,
            stock: 9,
            image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            description: 'เป้หนังแท้ทั้งใบ ฝาปิดพร้อมสายรัดเข็มขัดคู่ สวยคลาสสิก เหมาะสำหรับเดินทางและทำงาน',
            material: 'Top Grain Vintage Leather',
            dimensions: '40 x 30 x 14 cm',
            color: 'Cognac Saddle',
            badge: 'BESTSELLER',
            is_active: true
        },
        {
            id: 'prod-033',
            sku: 'BAG-BPK-33',
            name: 'Mini Chic Urban Leather Backpack',
            name_th: 'มินิเป้หนังแฟชั่นสำหรับผู้หญิง',
            category: 'backpack',
            price: 2390.00,
            cost_price: 1050.00,
            stock: 25,
            image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
            description: 'เป้ขนาดกะทัดรัดน่ารัก สายสะพายสามารถปรับเป็นสะพายข้างได้ 2-in-1',
            material: 'Soft Pebble Vegan Leather',
            dimensions: '26 x 22 x 10 cm',
            color: 'Blush Pink',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-034',
            sku: 'BAG-BPK-34',
            name: 'Commuter Slim Laptop Backpack',
            name_th: 'เป้ใส่แล็ปท็อปทรงสลิมคนทำงาน',
            category: 'backpack',
            price: 2190.00,
            cost_price: 900.00,
            stock: 22,
            image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            description: 'เป้ทรงบางเฉียบ เหมาะขึ้นรถไฟฟ้า มีพอร์ตชาร์จ USB ด้านข้าง และช่องซ่อนเงินด้านหลัง',
            material: 'Water-repellent Oxford Poly',
            dimensions: '43 x 29 x 10 cm',
            color: 'Midnight Black',
            badge: '',
            is_active: true
        },
        {
            id: 'prod-035',
            sku: 'BAG-BPK-35',
            name: 'Nomad Waxed Canvas Outdoor Backpack',
            name_th: 'เป้ผ้าแคนวาสเคลือบแว็กซ์สไตล์เอาท์ดอร์',
            category: 'backpack',
            price: 3690.00,
            cost_price: 1700.00,
            stock: 14,
            image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
            description: 'ผ้าแคนวาสหนาเคลือบแว็กซ์กันน้ำ ทนทานทุกสภาพอากาศ ตกแต่งด้วยหนังแท้หนาพิเศษ',
            material: 'Waxed Heavy Canvas 18oz & Leather',
            dimensions: '44 x 32 x 16 cm',
            color: 'Khaki Green',
            badge: 'LIMITED',
            is_active: true
        },
        {
            id: 'prod-036',
            sku: 'BAG-BPK-36',
            name: 'Starlight Metallic Fashion Backpack',
            name_th: 'เป้สะพายหลังหนังเมทัลลิกประกายดาว',
            category: 'backpack',
            price: 2550.00,
            cost_price: 1100.00,
            stock: 16,
            image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
            description: 'เป้แฟชั่นหนังเคลือบประกายเมทัลลิกวิบวับ เพิ่มความสนุกสนานให้กับการแต่งตัว',
            material: 'Metallic Coated Leather',
            dimensions: '28 x 24 x 11 cm',
            color: 'Rose Gold Metallic',
            badge: 'NEW',
            is_active: true
        },

        // --- 5. TRAVEL & DUFFEL BAGS (6 items) ---
        {
            id: 'prod-037',
            sku: 'BAG-TRV-05',
            name: 'Weekend Duffel Travel Bag',
            name_th: 'กระเป๋าเดินทางสไตล์วีคเอนเดอร์',
            category: 'travel',
            price: 4500.00,
            cost_price: 2200.00,
            stock: 8,
            image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าเดินทางความจุ 45L ผ้ากันละอองน้ำ ผสมหนังแท้ ช่องใส่รองเท้าแยกด้านข้าง',
            material: 'Waterproof Ballistic Nylon & Leather',
            dimensions: '52 x 30 x 26 cm',
            color: 'Olive Green & Leather',
            badge: 'LIMITED',
            is_active: true
        },
        {
            id: 'prod-038',
            sku: 'BAG-TRV-38',
            name: 'Voyager All-Leather Weekender',
            name_th: 'กระเป๋าเดินทางหนังแท้รุ่นวอยเอเจอร์',
            category: 'travel',
            price: 6890.00,
            cost_price: 3500.00,
            stock: 6,
            image_url: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าเดินทางหนังวัวแท้ทั้งใบ ระดับไฮเอนด์ สำหรับนักเดินทางผู้รักความหรูหรา',
            material: 'Full Grain Italian Leather',
            dimensions: '55 x 32 x 28 cm',
            color: 'Rich Dark Chocolate',
            badge: 'BESTSELLER',
            is_active: true
        },
        {
            id: 'prod-039',
            sku: 'BAG-TRV-39',
            name: 'Aerolite Foldable Flight Duffle',
            name_th: 'กระเป๋าพับได้สำหรับพกพาขึ้นเครื่อง',
            category: 'travel',
            price: 1250.00,
            cost_price: 490.00,
            stock: 45,
            image_url: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าเสริมพับเก็บใส่ซองเล็กได้ เสียบกับคันชักกระเป๋าล้อลากได้พอดี',
            material: 'Ultra-light Ripstop Nylon',
            dimensions: '48 x 32 x 20 cm',
            color: 'Slate Blue',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-040',
            sku: 'BAG-TRV-40',
            name: 'Sport & Gym Duffle with Shoe Pocket',
            name_th: 'กระเป๋ายิมและกีฬาช่องแยกใส่รองเท้า',
            category: 'travel',
            price: 1790.00,
            cost_price: 750.00,
            stock: 30,
            image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าออกกำลังกายและทริป 2 วัน ช่องระบายอากาศสำหรับรองเท้า และช่องใส่ชุดเปียก',
            material: 'Heavy Duty Oxford & TPU',
            dimensions: '46 x 26 x 24 cm',
            color: 'Charcoal / Neon Trim',
            badge: '',
            is_active: true
        },
        {
            id: 'prod-041',
            sku: 'BAG-TRV-41',
            name: 'Safari Canvas & Leather Holdall',
            name_th: 'กระเป๋าเดินทางแคนวาสสไตล์ซาฟารี',
            category: 'travel',
            price: 3890.00,
            cost_price: 1800.00,
            stock: 12,
            image_url: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80',
            description: 'ผ้าแคนวาสลายทวิลหนาพิเศษ แต่งสายหนังแท้และหมุดทองเหลือง แข็งแรงทนทาน',
            material: 'Twill Canvas & Saddle Leather',
            dimensions: '50 x 28 x 25 cm',
            color: 'Desert Sand & Tan',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-042',
            sku: 'BAG-TRV-42',
            name: 'Garment Suit Carrier Travel Bag',
            name_th: 'กระเป๋าเดินทางเก็บสูทและชุดราตรี 2-in-1',
            category: 'travel',
            price: 4290.00,
            cost_price: 2000.00,
            stock: 10,
            image_url: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80',
            description: 'กางออกเป็นถุงคลุมสูทไม่ให้ยับ พับประกอบเป็นกระเป๋าดัฟเฟิลเดินทางได้ทันที',
            material: 'Anti-wrinkle Waterproof Fabric',
            dimensions: '54 x 30 x 28 cm',
            color: 'Matte Executive Black',
            badge: 'NEW',
            is_active: true
        },

        // --- 6. MINI BAGS, WALLETS & CLUTCHES (8 items) ---
        {
            id: 'prod-043',
            sku: 'BAG-WLT-09',
            name: 'Compact Multi-card Clutch Wallet',
            name_th: 'กระเป๋าคลัตช์ใส่บัตรและมือถือ',
            category: 'mini',
            price: 1150.00,
            cost_price: 480.00,
            stock: 25,
            image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าสตางค์และคลัตช์ขนาดพกพา ใส่การ์ดได้ 12 ใบ พร้อมช่องซิปเหรียญและสายคล้องข้อมือ',
            material: 'Cross-grain Leather',
            dimensions: '19 x 10 x 2.5 cm',
            color: 'Dusty Rose',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-044',
            sku: 'BAG-MIN-44',
            name: 'Prestige Zip-Around Long Wallet',
            name_th: 'กระเป๋าสตางค์ซิปรอบหนังแท้ทรงยาว',
            category: 'mini',
            price: 1850.00,
            cost_price: 800.00,
            stock: 28,
            image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            description: 'ซิปรูดรอบปกป้องของด้านใน ใส่ธนบัตรไม่ต้องพับ มีช่องใส่เหรียญและบัตร 16 ช่อง',
            material: 'Full Grain Saffiano Leather',
            dimensions: '20 x 10.5 x 2.5 cm',
            color: 'Classic Black',
            badge: 'BESTSELLER',
            is_active: true
        },
        {
            id: 'prod-045',
            sku: 'BAG-MIN-45',
            name: 'Slim MagSafe Leather Cardholder',
            name_th: 'กระเป๋าเก็บบัตรทรงบางเฉียบแม่เหล็ก',
            category: 'mini',
            price: 690.00,
            cost_price: 250.00,
            stock: 50,
            image_url: 'https://images.unsplash.com/photo-1614179689702-355944cf0918?auto=format&fit=crop&w=800&q=80',
            description: 'ที่ใส่บัตรหนังแท้ขนาดบางเฉียบ จุบัตรได้ 6 ใบ พกใส่กระเป๋าเสื้อได้พอดี',
            material: 'Vegetable Tanned Leather',
            dimensions: '10 x 7.5 x 0.5 cm',
            color: 'Caramel & Gold',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-046',
            sku: 'BAG-MIN-46',
            name: 'Glamour Satin Evening Minaudière',
            name_th: 'กระเป๋าคลัตช์ซาตินประดับเพชรออกงาน',
            category: 'mini',
            price: 2690.00,
            cost_price: 1100.00,
            stock: 15,
            image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าคลัตช์กล่องหุ้มผ้าซาตินเงางาม ตัวล็อคเพชรคริสตัล มีสายโซ่สะพายถอดได้',
            material: 'Duchess Satin & Austrian Crystals',
            dimensions: '18 x 11 x 5 cm',
            color: 'Silver Sparkle',
            badge: 'LIMITED',
            is_active: true
        },
        {
            id: 'prod-047',
            sku: 'BAG-MIN-47',
            name: 'Bespoke Coin & Key Pouch',
            name_th: 'กระเป๋าใส่เหรียญและพวงกุญแจหนังแท้',
            category: 'mini',
            price: 790.00,
            cost_price: 290.00,
            stock: 35,
            image_url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าจิ๋วใส่กุญแจบ้านและเหรียญ มีห่วงคล้องกระเป๋าใหญ่ สวยน่ารักและใช้ประโยชน์ได้จริง',
            material: 'Pebble Leather & Brass Keyring',
            dimensions: '11 x 7 x 2 cm',
            color: 'Honey Mustard',
            badge: '',
            is_active: true
        },
        {
            id: 'prod-048',
            sku: 'BAG-MIN-48',
            name: 'Trifold Compact Leather Wallet',
            name_th: 'กระเป๋าสตางค์พับสามทบขนาดกะทัดรัด',
            category: 'mini',
            price: 1390.00,
            cost_price: 580.00,
            stock: 30,
            image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าสตางค์พับสามตอน ขนาดเล็กจิ๋วแต่ใส่แบงก์พันได้ครบ ช่องใส่บัตร 8 ช่อง',
            material: 'Smooth Calfskin',
            dimensions: '10 x 8 x 3 cm',
            color: 'Sage Green',
            badge: 'NEW',
            is_active: true
        },
        {
            id: 'prod-049',
            sku: 'BAG-MIN-49',
            name: 'Velvet Ribbon Wristlet Clutch',
            name_th: 'กระเป๋าคลัตช์คล้องมือโบว์กำมะหยี่',
            category: 'mini',
            price: 1590.00,
            cost_price: 650.00,
            stock: 22,
            image_url: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าคลัตช์คล้องข้อมือตกแต่งโบว์กำมะหยี่หวานซ่อนเปรี้ยว เหมาะกับงานปาร์ตี้',
            material: 'Premium Velvet & Satin Lining',
            dimensions: '22 x 14 x 3 cm',
            color: 'Ruby Red Velvet',
            badge: 'HOT',
            is_active: true
        },
        {
            id: 'prod-050',
            sku: 'BAG-MIN-50',
            name: 'Aurelia Metallic Card & Lipstick Case',
            name_th: 'กระเป๋ามินิใส่ลิปสติกและการ์ดออเรเลีย',
            category: 'mini',
            price: 1290.00,
            cost_price: 520.00,
            stock: 26,
            image_url: 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&w=800&q=80',
            description: 'กระเป๋าไซส์ไมโครพร้อมกระจกเงาด้านใน ใส่ลิปสติกและบัตร 2 ใบ สายโซ่สะพายครอสบอดี้ได้',
            material: 'Metallic Microfiber Leather',
            dimensions: '11 x 9 x 4 cm',
            color: 'Champagne Gold',
            badge: 'LIMITED',
            is_active: true
        }
    ];

    // ==========================================
    // 2. UTILITY FUNCTIONS
    // ==========================================
    function formatTHB(amount) {
        const num = Number(amount) || 0;
        return '฿' + num.toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function formatDateTime(dateStr) {
        const date = dateStr ? new Date(dateStr) : new Date();
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function generateOrderNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const randomSeq = Math.floor(1000 + Math.random() * 9000);
        return `SPR-${year}${month}${day}-${randomSeq}`;
    }

    function generatePromptPayPayload(target = '0891234567', amount = 0) {
        const sanitizedTarget = target.replace(/[^0-9]/g, '');
        let targetFormatted = '';
        let targetTag = '';

        if (sanitizedTarget.length === 10 && sanitizedTarget.startsWith('0')) {
            targetFormatted = '0066' + sanitizedTarget.substring(1);
            targetTag = '01';
        } else {
            targetFormatted = sanitizedTarget;
            targetTag = '02';
        }

        const targetSubField = `0016A000000677010111${targetTag}${String(targetFormatted.length).padStart(2, '0')}${targetFormatted}`;
        const merchantAccountInfo = `29${String(targetSubField.length).padStart(2, '0')}${targetSubField}`;

        let payload = `000201010212${merchantAccountInfo}5303764`;

        if (amount > 0) {
            const amtStr = Number(amount).toFixed(2);
            payload += `54${String(amtStr.length).padStart(2, '0')}${amtStr}`;
        }

        payload += '5802TH6304';
        const crc = crc16(payload);
        return payload + crc;
    }

    function crc16(data) {
        let crc = 0xFFFF;
        for (let i = 0; i < data.length; i++) {
            crc ^= data.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                if ((crc & 0x8000) !== 0) {
                    crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
                } else {
                    crc = (crc << 1) & 0xFFFF;
                }
            }
        }
        return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    }

    class SoundEffects {
        constructor() { this.ctx = null; }
        init() {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) this.ctx = new AudioContext();
            }
        }
        beep() {
            try {
                this.init();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.08);
            } catch (e) {}
        }
        cashSuccess() {
            try {
                this.init();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                const osc1 = this.ctx.createOscillator();
                const gain1 = this.ctx.createGain();
                osc1.frequency.setValueAtTime(1318.51, now);
                gain1.gain.setValueAtTime(0.15, now);
                gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc1.connect(gain1);
                gain1.connect(this.ctx.destination);
                osc1.start(now);
                osc1.stop(now + 0.25);

                const osc2 = this.ctx.createOscillator();
                const gain2 = this.ctx.createGain();
                osc2.frequency.setValueAtTime(1975.53, now + 0.1);
                gain2.gain.setValueAtTime(0.18, now + 0.1);
                gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                osc2.connect(gain2);
                gain2.connect(this.ctx.destination);
                osc2.start(now + 0.1);
                osc2.stop(now + 0.5);
            } catch (e) {}
        }
    }
    const sounds = new SoundEffects();

    function showToast(message, type = 'info', title = '') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast-item toast-${type}`;

        let icon = '🔔';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';
        if (type === 'warning') icon = '⚠️';

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-msg">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">&times;</button>
        `;

        container.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        });

        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 300);
            }
        }, 3800);
    }

    function launchConfetti() {
        if (window.confetti) {
            window.confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#B87333', '#D4AF37', '#1A1A1A', '#E8D8C8', '#4A6B53']
            });
        }
    }

    // ==========================================
    // 3. DATABASE / SUPABASE MANAGER
    // ==========================================
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

        initClient() {
            if (this.supabaseUrl && this.supabaseKey && window.supabase) {
                try {
                    this.client = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
                    this.isConnected = true;
                } catch (err) {
                    this.client = null;
                    this.isConnected = false;
                }
            } else {
                this.client = null;
                this.isConnected = false;
            }
        }

        async testConnection(url, key) {
            if (!window.supabase) {
                throw new Error('Supabase JS SDK not loaded yet.');
            }
            try {
                const testClient = window.supabase.createClient(url, key);
                const { data, error } = await testClient.from('products').select('count', { count: 'exact', head: true });
                if (error) {
                    if (error.code === '42P01') {
                        return { success: true, warning: 'Connected, but "products" table not found. Please run supabase_schema.sql first!' };
                    }
                    throw error;
                }
                return { success: true, message: 'Connection successful!' };
            } catch (error) {
                throw new Error(error.message || 'Cannot connect to Supabase. Check URL and Anon Key.');
            }
        }

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
                        localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(data));
                        return data;
                    } else {
                        return this.getLocalProducts();
                    }
                } catch (err) {
                    return this.getLocalProducts();
                }
            }
            return this.getLocalProducts();
        }

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
                } catch (err) {}
            }

            this.updateLocalProductCache(newProduct, 'add');
            return newProduct;
        }

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
                } catch (err) {}
            }

            this.updateLocalProductCache({ id, ...updates }, 'update');
            return { id, ...updates };
        }

        async deleteProduct(id) {
            if (this.isConnected && this.client) {
                try {
                    const { error } = await this.client
                        .from('products')
                        .delete()
                        .eq('id', id);
                    if (error) throw error;
                } catch (err) {}
            }
            this.updateLocalProductCache({ id }, 'delete');
            return true;
        }

        async seedToSupabase() {
            if (!this.isConnected || !this.client) {
                throw new Error('กรุณาเชื่อมต่อ Supabase ให้เรียบร้อยก่อนทำการนำเข้าข้อมูล');
            }

            try {
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
                throw new Error(err.message || 'เกิดข้อผิดพลาดในการนำเข้าข้อมูล');
            }
        }

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
                    const { data: createdOrder, error: orderErr } = await this.client
                        .from('orders')
                        .insert([orderData])
                        .select()
                        .single();

                    if (orderErr) throw orderErr;

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

                    await this.client.from('order_items').insert(itemsData);

                    for (const item of items) {
                        if (item.id) {
                            try {
                                const newStock = Math.max(0, (item.currentStock || item.stock || 0) - item.quantity);
                                await this.client.from('products').update({ stock: newStock }).eq('id', item.id);
                            } catch (stkErr) {}
                        }
                    }

                    this.saveLocalOrder({ ...orderData, items });
                    return createdOrder || orderData;
                } catch (err) {}
            }

            this.saveLocalOrder({ ...orderData, items });
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
                } catch (err) {}
            }
            return this.getLocalOrders();
        }

        getLocalProducts() {
            const stored = localStorage.getItem(STORAGE_KEYS.LOCAL_PRODUCTS);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length >= 50) {
                        return parsed;
                    }
                } catch (e) {}
            }
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
                } catch (e) {}
            }
            return [];
        }

        saveLocalOrder(order) {
            const orders = this.getLocalOrders();
            orders.unshift(order);
            localStorage.setItem(STORAGE_KEYS.LOCAL_ORDERS, JSON.stringify(orders));
        }
    }

    const db = new SupabaseManager();

    // ==========================================
    // 4. POS MANAGER
    // ==========================================
    class POSManager {
        constructor(onCartUpdated = null, onOrderCompleted = null) {
            this.cart = [];
            this.discountType = 'fixed';
            this.discountValue = 0;
            this.appliedCoupon = null;
            this.includeVat = true;
            this.currentPaymentMethod = 'promptpay';
            this.cashReceived = 0;
            this.promptPayAccount = '0891234567';

            this.onCartUpdated = onCartUpdated;
            this.onOrderCompleted = onOrderCompleted;
            this.lastCompletedOrder = null;
        }

        addToCart(product, quantity = 1) {
            if (!product) return;

            if (product.stock <= 0) {
                showToast(`สินค้า "${product.name_th || product.name}" หมดสต็อก`, 'warning', 'สต็อกไม่เพียงพอ');
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

        removeFromCart(productId) {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.notifyCartChange();
            showToast('ลบรายการออกจากตะกร้าแล้ว', 'info');
        }

        clearCart() {
            if (this.cart.length === 0) return;
            this.cart = [];
            this.discountValue = 0;
            this.appliedCoupon = null;
            this.notifyCartChange();
            showToast('ล้างตะกร้าสินค้าเรียบร้อย', 'info');
        }

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
            if (this.includeVat) {
                vat = (netAfterDiscount * 7) / 107;
            }

            return {
                subtotal,
                discount: discountAmount,
                vat,
                total: netAfterDiscount,
                itemCount
            };
        }

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
                await db.createOrder(orderData, this.cart);
                this.lastCompletedOrder = {
                    ...orderData,
                    items: [...this.cart],
                    created_at: new Date().toISOString()
                };

                sounds.cashSuccess();
                launchConfetti();
                showToast(`ชำระเงินสำเร็จ บิล #${orderNumber}`, 'success', 'ทำรายการสำเร็จ');

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

    // ==========================================
    // 5. INVENTORY & REPORT MANAGERS
    // ==========================================
    class InventoryManager {
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
                    await db.updateProduct(this.currentEditProduct.id, {
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
                    await db.addProduct({
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

    class ReportManager {
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

            const byPayment = { promptpay: 0, cash: 0, card: 0 };
            todayOrders.forEach(o => {
                const method = (o.payment_method || 'promptpay').toLowerCase();
                if (byPayment[method] !== undefined) {
                    byPayment[method] += Number(o.total_amount) || 0;
                }
            });

            return { today, totalSales, orderCount, avgTicket, byPayment, todayOrders };
        }
    }

    // ==========================================
    // 6. MAIN APPLICATION CONTROLLER
    // ==========================================
    class App {
        constructor() {
            this.activeView = 'pos';
            this.products = [];
            this.currentCategory = 'all';
            this.searchTerm = '';

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

            await this.loadProducts();
            this.updateSupabaseStatusIndicator();
        }

        initIcons() {
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }

        bindNavigation() {
            const navBtns = document.querySelectorAll('.nav-mode-btn');
            navBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.switchView(btn.dataset.view);
                });
            });

            const brandHome = document.getElementById('btn-brand-home');
            if (brandHome) {
                brandHome.addEventListener('click', () => this.switchView('pos'));
            }
        }

        async switchView(viewName) {
            this.activeView = viewName;

            document.querySelectorAll('.nav-mode-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === viewName);
            });

            document.querySelectorAll('.main-view').forEach(view => {
                view.classList.remove('active');
            });

            const targetView = document.getElementById(`view-${viewName}`);
            if (targetView) targetView.classList.add('active');

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

            if (this.currentCategory && this.currentCategory !== 'all') {
                filtered = filtered.filter(p => p.category === this.currentCategory);
            }

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
                            <img src="${prod.image_url}" alt="${prod.name_th}" class="pos-card-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'">
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
                                <button class="pos-card-btn-add" ${isOutOfStock ? 'disabled' : ''}>+</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

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

        bindPOSControls() {
            const searchInput = document.getElementById('pos-search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.searchTerm = e.target.value;
                    this.renderPOSProducts();
                });

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

            const clearBtn = document.getElementById('btn-clear-cart');
            if (clearBtn) clearBtn.addEventListener('click', () => this.pos.clearCart());

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

            const checkoutBtn = document.getElementById('btn-open-checkout');
            if (checkoutBtn) checkoutBtn.addEventListener('click', () => this.openPaymentModal());
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

        bindPaymentModal() {
            const modal = document.getElementById('modal-payment');
            const closeBtn = document.getElementById('btn-close-payment');
            const cancelBtn = document.getElementById('btn-cancel-payment');
            const confirmBtn = document.getElementById('btn-confirm-payment');

            const closeModal = () => modal.classList.remove('open');
            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

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

            const cashInput = document.getElementById('cash-received-input');
            if (cashInput) {
                cashInput.addEventListener('input', () => {
                    this.pos.cashReceived = Number(cashInput.value) || 0;
                    this.updateCashCalculations();
                });
            }

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

            if (confirmBtn) {
                confirmBtn.addEventListener('click', async () => {
                    const customerName = document.getElementById('pos-customer-name')?.value || 'หน้าร้าน (Walk-in)';
                    const result = await this.pos.processPayment({ name: customerName });
                    if (result) {
                        closeModal();
                        await this.loadProducts();
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

            this.pos.cashReceived = 0;
            const cashInput = document.getElementById('cash-received-input');
            if (cashInput) cashInput.value = '';

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

            // Create Thai QR Payment Container
            const qrWrapper = document.createElement('div');
            qrWrapper.style.display = 'flex';
            qrWrapper.style.flexDirection = 'column';
            qrWrapper.style.alignItems = 'center';
            qrWrapper.style.gap = '8px';

            const canvas = document.createElement('canvas');
            canvas.style.borderRadius = '8px';
            canvas.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            qrWrapper.appendChild(canvas);

            const payload = generatePromptPayPayload(this.pos.promptPayAccount, totals.total);
            
            // Try QRCode library, or fallback to instant SVG QR matrix
            if (window.QRCode && window.QRCode.toCanvas) {
                window.QRCode.toCanvas(canvas, payload, {
                    width: 210,
                    margin: 2,
                    color: { dark: '#003D79', light: '#FFFFFF' }
                }, (error) => {
                    if (error) this.renderFallbackQR(qrWrapper, totals.total);
                });
            } else {
                this.renderFallbackQR(qrWrapper, totals.total);
            }

            canvasContainer.appendChild(qrWrapper);
        }

        renderFallbackQR(container, amount) {
            container.innerHTML = `
                <div style="background: #FFF; padding: 12px; border-radius: 8px; border: 2px solid #003D79; text-align: center;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PROMPTPAY-SAMPHARA-${amount}&color=003D79" 
                         alt="PromptPay QR Code" 
                         style="width: 200px; height: 200px; display: block; margin: 0 auto;"
                         onerror="this.parentElement.innerHTML='<div style=\\'width:200px;height:200px;background:#003D79;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;padding:10px;text-align:center;\\'>THAI QR PAYMENT<br>฿${amount}</div>'">
                </div>
            `;
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

        bindReceiptModal() {
            const modal = document.getElementById('modal-receipt');
            const closeBtn = document.getElementById('btn-close-receipt');
            const doneBtn = document.getElementById('btn-done-receipt');
            const printBtn = document.getElementById('btn-print-receipt');

            const closeModal = () => modal.classList.remove('open');
            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            if (doneBtn) doneBtn.addEventListener('click', closeModal);

            if (printBtn) {
                printBtn.addEventListener('click', () => window.print());
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

        bindStorefrontControls() {
            const searchInput = document.getElementById('storefront-search');
            const sortSelect = document.getElementById('storefront-sort');

            if (searchInput) searchInput.addEventListener('input', () => this.renderStorefront());
            if (sortSelect) sortSelect.addEventListener('change', () => this.renderStorefront());
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

            if (this.currentCategory && this.currentCategory !== 'all') {
                items = items.filter(p => p.category === this.currentCategory);
            }

            const term = searchInput ? searchInput.value.toLowerCase() : '';
            if (term) {
                items = items.filter(p =>
                    p.name.toLowerCase().includes(term) ||
                    p.name_th.toLowerCase().includes(term) ||
                    (p.material && p.material.toLowerCase().includes(term)) ||
                    (p.description && p.description.toLowerCase().includes(term))
                );
            }

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
                            <img src="${prod.image_url}" alt="${prod.name_th}" class="storefront-card-image" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'">
                            <div class="storefront-card-badges">
                                ${prod.badge ? `<span class="badge ${badgeClass}">${prod.badge}</span>` : ''}
                            </div>
                            <button class="storefront-card-quickview" data-id="${prod.id}">ดูรายละเอียด</button>
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

        bindProductDetailModal() {
            const modal = document.getElementById('modal-product-detail');
            const closeBtn = document.getElementById('btn-close-detail');
            if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
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

        bindInventoryControls() {
            const addBtn = document.getElementById('btn-add-new-product');
            const modal = document.getElementById('modal-product-form');
            const closeBtn = document.getElementById('btn-close-product-form');
            const cancelBtn = document.getElementById('btn-cancel-product-form');
            const form = document.getElementById('product-form');
            const fileInput = document.getElementById('prod-form-file');
            const fileNameDisplay = document.getElementById('prod-form-file-name');
            const urlInput = document.getElementById('prod-form-image');
            const previewImg = document.getElementById('prod-form-preview-img');

            const closeModal = () => modal.classList.remove('open');
            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

            // Handle Local File Upload -> Base64
            if (fileInput) {
                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        if (fileNameDisplay) fileNameDisplay.textContent = file.name;
                        const reader = new FileReader();
                        reader.onload = (loadEvt) => {
                            const base64Data = loadEvt.target.result;
                            if (urlInput) urlInput.value = base64Data;
                            if (previewImg) previewImg.src = base64Data;
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }

            // Handle URL typing live preview
            if (urlInput) {
                urlInput.addEventListener('input', (e) => {
                    const val = e.target.value.trim();
                    if (previewImg && val) {
                        previewImg.src = val;
                    }
                });
            }

            // Open Add Product Modal
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    this.inventory.currentEditProduct = null;
                    document.getElementById('product-form-title').innerHTML = '<i data-lucide="plus-circle"></i><span>เพิ่มสินค้ากระเป๋าใหม่</span>';
                    form.reset();
                    if (fileNameDisplay) fileNameDisplay.textContent = '';
                    if (previewImg) previewImg.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80';
                    if (urlInput) urlInput.value = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80';
                    modal.classList.add('open');
                    this.initIcons();
                });
            }

            // Submit Add / Edit Form
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = {
                        name_th: document.getElementById('prod-form-name-th').value.trim(),
                        name: document.getElementById('prod-form-name').value.trim(),
                        sku: document.getElementById('prod-form-sku').value.trim(),
                        category: document.getElementById('prod-form-category').value,
                        price: Number(document.getElementById('prod-form-price').value),
                        cost_price: Number(document.getElementById('prod-form-cost').value || 0),
                        stock: Number(document.getElementById('prod-form-stock').value),
                        badge: document.getElementById('prod-form-badge').value,
                        image_url: document.getElementById('prod-form-image').value.trim() || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
                        material: document.getElementById('prod-form-material').value.trim(),
                        dimensions: document.getElementById('prod-form-dimensions').value.trim(),
                        description: document.getElementById('prod-form-desc').value.trim()
                    };

                    if (this.inventory.currentEditProduct) {
                        // Edit existing
                        const prodId = this.inventory.currentEditProduct.id;
                        const idx = this.products.findIndex(p => p.id === prodId || p.sku === this.inventory.currentEditProduct.sku);
                        if (idx > -1) {
                            this.products[idx] = { ...this.products[idx], ...formData };
                            localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(this.products));
                            if (db.isConnected) {
                                try { await db.updateProduct(prodId, formData); } catch (err) {}
                            }
                            showToast(`แก้ไขสินค้า "${formData.name_th}" สำเร็จ!`, 'success');
                        }
                    } else {
                        // Add new
                        const newProd = {
                            id: 'prod-' + Date.now(),
                            ...formData,
                            is_active: true,
                            created_at: new Date().toISOString()
                        };
                        this.products.unshift(newProd);
                        localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(this.products));
                        if (db.isConnected) {
                            try { await db.addProduct(newProd); } catch (err) {}
                        }
                        showToast(`เพิ่มกระเป๋าใหม่ "${formData.name_th}" สำเร็จ!`, 'success');
                    }

                    closeModal();
                    this.renderInventoryTable();
                    this.renderPOSProducts();
                    this.renderStorefront();
                });
            }
        }

        renderInventoryTable() {
            const tbody = document.getElementById('inventory-table-body');
            if (!tbody) return;

            if (this.products.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--color-muted);">ไม่มีข้อมูลสินค้า</td></tr>`;
                return;
            }

            tbody.innerHTML = this.products.map(prod => `
                <tr style="border-bottom: 1px solid var(--color-border);" data-row-id="${prod.id}">
                    <td style="padding: 0.75rem 1rem;">
                        <img src="${prod.image_url}" alt="${prod.name_th}" style="width: 48px; height: 48px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'">
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

            // Quick Stock Change
            tbody.querySelectorAll('.quick-stock-input').forEach(input => {
                input.addEventListener('change', () => {
                    const prodId = input.dataset.id;
                    const newStock = Number(input.value) || 0;
                    const prod = this.products.find(p => p.id === prodId);
                    if (prod) {
                        prod.stock = newStock;
                        localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(this.products));
                        if (db.isConnected) db.updateProduct(prodId, { stock: newStock });
                        showToast(`ปรับสต็อก "${prod.name_th}" เป็น ${newStock} ชิ้น`, 'success');
                        this.renderPOSProducts();
                        this.renderStorefront();
                    }
                });
            });

            // Edit Product
            tbody.querySelectorAll('.btn-edit-prod').forEach(btn => {
                btn.addEventListener('click', () => {
                    const prod = this.products.find(p => p.id === btn.dataset.id);
                    if (prod) this.openEditProductModal(prod);
                });
            });

            // Delete Product (Real-time Delete)
            tbody.querySelectorAll('.btn-del-prod').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const prodId = btn.dataset.id;
                    const prodName = btn.dataset.name;
                    if (confirm(`คุณต้องการลบสินค้า "${prodName}" ออกจากคลังสินค้าใช่หรือไม่?`)) {
                        this.products = this.products.filter(p => p.id !== prodId);
                        localStorage.setItem(STORAGE_KEYS.LOCAL_PRODUCTS, JSON.stringify(this.products));
                        if (db.isConnected) {
                            try { await db.deleteProduct(prodId); } catch (err) {}
                        }
                        showToast(`ลบสินค้า "${prodName}" เรียบร้อยแล้ว`, 'info');
                        this.renderInventoryTable();
                        this.renderPOSProducts();
                        this.renderStorefront();
                    }
                });
            });
        }

        openEditProductModal(prod) {
            this.inventory.currentEditProduct = prod;
            const modal = document.getElementById('modal-product-form');
            const previewImg = document.getElementById('prod-form-preview-img');
            const fileNameDisplay = document.getElementById('prod-form-file-name');

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

            if (fileNameDisplay) fileNameDisplay.textContent = '';
            if (previewImg) previewImg.src = prod.image_url || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80';

            modal.classList.add('open');
            this.initIcons();
        }

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

            if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));

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

    // Auto initialize on DOM ready or window load
    function bootstrap() {
        if (!window.app) {
            window.app = new App();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }
})();
