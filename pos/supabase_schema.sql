-- ==============================================================================
-- 👜 SAMPHA RA (สัมภาระ) - Supabase Database Schema
-- Point of Sale & Storefront Database (50 Fashion Bags Collection)
-- ==============================================================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_th TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT DEFAULT 'ShoppingBag',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_th TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    cost_price NUMERIC(10, 2) DEFAULT 0 CHECK (cost_price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image_url TEXT NOT NULL,
    description TEXT,
    material TEXT,
    dimensions TEXT,
    color TEXT,
    badge TEXT, -- 'NEW', 'BESTSELLER', 'HOT', 'LIMITED'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT DEFAULT 'หน้าร้าน (Walk-in)',
    customer_phone TEXT,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    vat NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    amount_received NUMERIC(10, 2) NOT NULL DEFAULT 0,
    change_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL, -- 'promptpay', 'cash', 'card'
    payment_status TEXT NOT NULL DEFAULT 'paid', -- 'paid', 'pending', 'cancelled'
    cashier_name TEXT DEFAULT 'Cashier 01',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    sku TEXT,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS) & Allow Anonymous Read/Write for POS Storefront Demo
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public insert categories" ON public.categories FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read order_items" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert order_items" ON public.order_items FOR INSERT WITH CHECK (true);

-- 6. Trigger for Updating updated_at timestamp on Products
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 7. Seed Initial Categories
INSERT INTO public.categories (name, name_th, slug, icon, display_order) VALUES
('All Bags', 'กระเป๋าทั้งหมด', 'all', 'Grid', 0),
('Tote Bags', 'กระเป๋าโท้ท', 'tote', 'ShoppingBag', 1),
('Crossbody', 'กระเป๋าสะพายข้าง', 'crossbody', 'Crosshair', 2),
('Shoulder Bags', 'กระเป๋าสะพายไหล่', 'shoulder', 'Briefcase', 3),
('Backpacks', 'เป้สะพายหลัง', 'backpack', 'Package', 4),
('Travel Bags', 'กระเป๋าเดินทาง', 'travel', 'Compass', 5),
('Mini & Wallets', 'กระเป๋าสตางค์และมินิ', 'mini', 'CreditCard', 6)
ON CONFLICT (slug) DO NOTHING;

-- 8. Seed 50 Curated Fashion Bags
INSERT INTO public.products (sku, name, name_th, category, price, cost_price, stock, image_url, description, material, dimensions, color, badge) VALUES
('BAG-TOT-01', 'Sampha Ra Classic Leather Tote', 'กระเป๋าโท้ทหนังแท้คลาสสิก', 'tote', 3890.00, 1950.00, 18, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', 'กระเป๋าโท้ทหนังแท้เกรดพรีเมียม สวยหรู จุของได้เยอะ เหมาะสำหรับทำงานและชีวิตประจำวัน', 'หนังวัวแท้ Grain Leather', '36 x 28 x 14 cm', 'Cognac Brown', 'BESTSELLER'),
('BAG-CAN-02', 'Minimalist Canvas Everyday Bag', 'กระเป๋าผ้าแคนวาสมินิมอล', 'tote', 1290.00, 550.00, 35, 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', 'กระเป๋าผ้าแคนวาสเนื้อหนา 16oz ทรงมินิมอล ใส่โน้ตบุ๊ก 14 นิ้วได้ มีช่องแยกด้านใน', 'Heavy Canvas 16oz & Leather Trim', '38 x 32 x 12 cm', 'Off-White / Natural', 'HOT'),
('BAG-BUC-08', 'Artisan Woven Bucket Tote', 'กระเป๋าทรงถังงานสานผสมหนัง', 'tote', 2150.00, 950.00, 15, 'https://images.unsplash.com/photo-1614179689702-355944cf0918?auto=format&fit=crop&w=800&q=80', 'กระเป๋าทรงถังลายสานประณีต มีถุงผ้าซับในรูดปิดได้ สไตล์ Natural Chic', 'Handwoven Raffia & Tan Leather', '22 x 25 x 15 cm', 'Natural Raffia', 'HOT'),
('BAG-FOL-11', 'Executive Laptop Folio Bag', 'กระเป๋าใส่แล็ปท็อปหนังเรียบหรู', 'tote', 3490.00, 1600.00, 12, 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=80', 'กระเป๋าเอกสารและแล็ปท็อปทรง Slim เรียบหรู เสริมภาพลักษณ์มืออาชีพ', 'Saffiano Leather', '39 x 29 x 5 cm', 'Midnight Navy', 'NEW'),
('BAG-TOT-05', 'Grand Horizon Oversized Shopper', 'กระเป๋าช้อปเปอร์ใบใหญ่จุใจ', 'tote', 2890.00, 1300.00, 20, 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80', 'กระเป๋าช้อปเปอร์ขนาดใหญ่พิเศษ น้ำหนักเบา จุสัมภาระได้ครบครัน เหมาะกับทุกทริป', 'Premium Vegan Nappa', '42 x 34 x 16 cm', 'Caramel Latte', 'HOT'),
('BAG-TOT-06', 'Riviera Straw Beach Tote', 'กระเป๋าสานริเวียร่าสไตล์ซัมเมอร์', 'tote', 1890.00, 800.00, 24, 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80', 'กระเป๋าสานธรรมชาติพร้อมหูหิ้วหนังแท้ สไตล์พักผ่อนริมทะเลและวันสบายๆ', 'Natural Straw & Calf Leather', '35 x 30 x 14 cm', 'Beige Straw & Cognac', 'NEW'),
('BAG-TOT-07', 'Monochrome Canvas Book Tote', 'กระเป๋าบุ๊คโท้ทลายโมโนโครม', 'tote', 1650.00, 700.00, 30, 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80', 'กระเป๋าผ้าทรงเหลี่ยมตั้งอยู่ทรง ลายกราฟิกคลาสสิก ใส่หนังสือและไอแพดได้สบาย', 'Jacquard Fabric & Canvas', '32 x 26 x 11 cm', 'Black & Ivory', ''),
('BAG-TOT-08', 'Oxford Structured Work Tote', 'กระเป๋าทำงานอ็อกซ์ฟอร์ดทรงเป๊ะ', 'tote', 4150.00, 2000.00, 14, 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80', 'กระเป๋าทำงานทรงสุภาพ แบ่ง 3 ช่องใหญ่ ซิปกลางปิดมิดชิด ปกป้องของมีค่า', 'Epsom Textured Leather', '37 x 27 x 13 cm', 'Charcoal Black', 'BESTSELLER'),
('BAG-TOT-09', 'Pleated Velvet Day Tote', 'กระเป๋าโท้ทผ้ากำมะหยี่อัดพลีท', 'tote', 1950.00, 850.00, 16, 'https://images.unsplash.com/photo-1587467512961-120760940315?auto=format&fit=crop&w=800&q=80', 'กระเป๋าผ้ากำมะหยี่เนื้อนุ่มอัดพลีทลอนสวย สัมผัสหรูหรา น้ำหนักเบาพกพาง่าย', 'Soft Velvet Pleats', '34 x 36 x 8 cm', 'Emerald Green', 'LIMITED'),
('BAG-TOT-10', 'Soft Leather Slouchy Hobo Tote', 'กระเป๋าโท้ทหนังนุ่มทรง Slouchy', 'tote', 3290.00, 1500.00, 19, 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80', 'กระเป๋าหนังทรงทิ้งตัว นุ่มนวลแนบตัว สไตล์มินิมอลญี่ปุ่น สะพายคล่องตัวทุกวัน', 'Soft Pebble Vegan Leather', '40 x 30 x 15 cm', 'Taupe Grey', 'NEW'),
('BAG-CRB-03', 'Urban Crossbody Saddle Bag', 'กระเป๋าสะพายข้างทรงแซดเดิล', 'crossbody', 2450.00, 1100.00, 14, 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80', 'กระเป๋าสะพายข้างทรงแซดเดิล โค้งมน อะไหล่ทองรมดำ ปรับสายสั้นยาวได้', 'Smooth PU Leather & Gold Hardware', '24 x 18 x 7 cm', 'Noir Black', 'NEW'),
('BAG-CRB-12', 'Sunset Mini Box Crossbody', 'กระเป๋าสะพายมินิบ็อกซ์รุ่นพิเศษ', 'crossbody', 1890.00, 800.00, 22, 'https://images.unsplash.com/photo-1566150902887-9679ec155ba0?auto=format&fit=crop&w=800&q=80', 'กระเป๋าทรงกล่องมินิดีไซน์น่ารัก ใส่สมาร์ตโฟนได้ทุกรุ่น ล็อคแม่เหล็กเปิดปิดง่าย', 'Smooth Box Leather', '18 x 13 x 6 cm', 'Terracotta Orange', 'LIMITED'),
('BAG-CRB-13', 'Metropolitan Camera Bag', 'กระเป๋ากล้องหนังสะพายข้าง', 'crossbody', 2190.00, 950.00, 18, 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?auto=format&fit=crop&w=800&q=80', 'กระเป๋าทรง Camera Bag สปอร์ตแคชชวล มีช่องซิปหน้า 2 ช่อง ใส่กระเป๋าสตางค์และมือถือครบ', 'Water-resistant Microfiber Leather', '21 x 15 x 8 cm', 'Olive Green', 'HOT'),
('BAG-CRB-14', 'Aura Half-Moon Crossbody', 'กระเป๋าสะพายข้างทรงฮาล์ฟมูน', 'crossbody', 2650.00, 1200.00, 16, 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=800&q=80', 'ทรงพระจันทร์ครึ่งดวงสุดเก๋ ฝาพับแม่เหล็กซ่อนด้านใน สายสะพายปรับระดับได้ 5 ระดับ', 'Smooth Calfskin Vegan Leather', '23 x 16 x 7 cm', 'Warm Almond', 'BESTSELLER'),
('BAG-CRB-15', 'Vintage Postman Leather Messenger', 'กระเป๋าสะพายทรงบุรุษไปรษณีย์วินเทจ', 'crossbody', 3490.00, 1650.00, 11, 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80', 'กระเป๋าสะพายหนังฟอกฝาดสไตล์วินเทจ ยิ่งใช้หนังยิ่งเงาสวย ทนทานนานนับสิบปี', 'Full Grain Waxed Leather', '28 x 22 x 9 cm', 'Antique Brown', 'HOT'),
('BAG-CRB-16', 'Nordic Minimalist Phone Bag', 'กระเป๋าสะพายใส่มือถือนอร์ดิก', 'crossbody', 990.00, 390.00, 40, 'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?auto=format&fit=crop&w=800&q=80', 'กระเป๋าใส่มือถือและบัตรใบกะทัดรัด น้ำหนักเบาพิเศษ พกพาสะดวกในวันชิลๆ', 'Soft PU Leather', '12 x 19 x 3 cm', 'Dusty Mint', 'NEW'),
('BAG-CRB-17', 'Celeste Accordion Crossbody', 'กระเป๋าสะพายข้างทรงหีบเพลง', 'crossbody', 2790.00, 1250.00, 15, 'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=800&q=80', 'ช่องใส่ของแบ่ง 3 พับแบบหีบเพลง จุของได้เป็นระเบียบเรียบร้อย ทรงสวยไม่เสียทรง', 'Saffiano Leather & Gold Accents', '22 x 16 x 8 cm', 'Burgundy Wine', ''),
('BAG-CRB-18', 'Sport Utility Nylon Sling Bag', 'กระเป๋าสะพายข้างผ้าไนลอนกันน้ำ', 'crossbody', 1450.00, 600.00, 28, 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', 'กระเป๋าผ้าไนลอนกันน้ำ 100% ซิปกันน้ำ สายสะพายหนานุ่ม สไตล์สตรีทแฟชั่น', 'Ballistic Nylon 420D', '26 x 17 x 6 cm', 'Matte Black', 'HOT'),
('BAG-CRB-19', 'Chic Bohemian Fringe Crossbody', 'กระเป๋าสะพายข้างแต่งพู่โบฮีเมียน', 'crossbody', 2290.00, 980.00, 12, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80', 'กระเป๋าหนังกลับแต่งพู่ยาวพลิ้วไหว สไตล์โบโฮชิค เข้ากับชุดเดรสและลุคท่องเที่ยว', 'Genuine Suede Leather', '20 x 22 x 5 cm', 'Desert Sand Suede', 'LIMITED'),
('BAG-CRB-20', 'Prestige Lock Metal Crossbody', 'กระเป๋าสะพายข้างล็อคทองหรู', 'crossbody', 3190.00, 1450.00, 14, 'https://images.unsplash.com/photo-1572196298647-45300069b208?auto=format&fit=crop&w=800&q=80', 'ตัวล็อคโลหะสีทองอร่ามดีไซน์โมเดิร์น หนังลายจระเข้เรียบหรู เสริมความมั่นใจ', 'Croc-Embossed Vegan Leather', '25 x 17 x 7 cm', 'Emerald Croc', 'BESTSELLER'),
('BAG-SHO-04', 'Signature Baguette Shoulder Bag', 'กระเป๋าสะพายไหล่ทรงบาแก็ตต์', 'shoulder', 3200.00, 1400.00, 10, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80', 'กระเป๋าสะพายไหล่ทรงเก๋สไตล์ฝรั่งเศส ให้ลุคเรียบหรูดูแพง น้ำหนักเบาคล่องตัว', 'Italian Smooth Leather', '27 x 14 x 6 cm', 'Caramel Tan', 'HOT'),
('BAG-FLA-06', 'Elegance Quilted Flap Bag', 'กระเป๋าหนังลายควิลต์โซ่ทอง', 'shoulder', 3990.00, 1800.00, 12, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', 'กระเป๋าหนังลายควิลต์ประดับสายโซ่ทองหรูหรา ซับในกำมะหยี่ เหมาะสำหรับออกงาน', 'Lambskin Touch PU & Chain', '26 x 16 x 8 cm', 'Champagne Beige', 'BESTSELLER'),
('BAG-HOB-10', 'Modern Crescent Moon Hobo Bag', 'กระเป๋าทรงพระจันทร์เสี้ยว', 'shoulder', 2790.00, 1250.00, 16, 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80', 'กระเป๋าสะพายทรงพระจันทร์เสี้ยว มินิมอลสายเกาหลี หนังนุ่มน้ำหนักเบา จุของครบ', 'Soft Vegan Leather', '30 x 20 x 8 cm', 'Cream Ivory', 'BESTSELLER'),
('BAG-SHO-24', 'Athena Chain Strap Shoulder Flap', 'กระเป๋าสะพายไหล่สายโซ่เอเธน่า', 'shoulder', 3650.00, 1600.00, 14, 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&w=800&q=80', 'สายโซ่คู่ปรับสะพายเดี่ยวหรือคู่ได้ ฝาพับทรงมน หนังเงาประกายหรูหรา', 'Glossy Calfskin Leather', '25 x 15 x 7 cm', 'Deep Cherry', 'NEW'),
('BAG-SHO-25', 'Parisienne Croissant Leather Bag', 'กระเป๋าหนังทรงครัวซองต์สไตล์ปารีส', 'shoulder', 2950.00, 1350.00, 18, 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', 'ดีไซน์จับจีบทรงครัวซองต์ยอดฮิต หนังนุ่มมาก ให้ลุคแฟชั่นนิสต้าตัวจริง', 'Ultra Soft Nappa Leather', '32 x 18 x 10 cm', 'Warm Butter / Cream', 'HOT'),
('BAG-SHO-26', 'Vogue Ruched Handle Shoulder Bag', 'กระเป๋าสะพายไหล่สายย่นแฟชั่น', 'shoulder', 1990.00, 850.00, 20, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', 'สายสะพายไหล่ออกแบบย่นมีมิติ น้ำหนักเบา ดีไซน์ล้ำสมัยใส่กับชุดไหนก็เด่น', 'Matte Silk Poly & Leather', '26 x 14 x 6 cm', 'Lilac Lavender', 'NEW'),
('BAG-SHO-27', 'Royal Heritage Structured Shoulder', 'กระเป๋าสะพายไหล่ทรงเหลี่ยมรอยัล', 'shoulder', 4350.00, 2100.00, 8, 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80', 'กระเป๋าหนังทรงเหลี่ยมตั้งแข็งแรง อะไหล่รมดำพรีเมียม สวยคลาสสิกข้ามกาลเวลา', 'Hand-dyed Saddle Leather', '28 x 19 x 8 cm', 'Ebony Black', 'LIMITED'),
('BAG-SHO-28', 'Solstice Double-Zip Shoulder Bag', 'กระเป๋าสะพายไหล่ซิปคู่โซลสติซ', 'shoulder', 2490.00, 1100.00, 22, 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80', 'ช่องซิปคู่แยกหน้าหลัง จุของได้เยอะ หยิบของสะดวก สายสะพายหนังแบนไม่เจ็บไหล่', 'Grained Vegan Leather', '29 x 16 x 9 cm', 'Sand Beige', ''),
('BAG-SHO-29', 'Chic Velvet Evening Shoulder Pochette', 'กระเป๋าสะพายไหล่กำมะหยี่ออกงาน', 'shoulder', 2250.00, 950.00, 15, 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80', 'กระเป๋าโพแชตกำมะหยี่เนื้อเงา ประดับคริสตัลที่หัวซิป สวยสะกดทุกสายตาในงานกลางคืน', 'Silk Velvet & Crystal Zipper', '24 x 13 x 5 cm', 'Midnight Navy Velvet', 'LIMITED'),
('BAG-SHO-30', 'Monogram Tweed Vintage Shoulder', 'กระเป๋าสะพายไหล่ผ้าทวีตโมโนแกรม', 'shoulder', 3100.00, 1350.00, 17, 'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?auto=format&fit=crop&w=800&q=80', 'ผ้าทวีตทอมือลายตารางหรูหรา ขอบหนังแท้สีเบจ สไตล์คุณหนูลักชูรี่', 'Woven Tweed Fabric & Leather', '27 x 15 x 6.5 cm', 'Tweed Ivory & Gold', 'HOT'),
('BAG-BPK-07', 'City Explorer Roll-top Backpack', 'เป้สะพายหลังกันน้ำดีไซน์คนเมือง', 'backpack', 2890.00, 1300.00, 20, 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80', 'เป้สะพายหลังสไตล์ Roll-top ช่องบุกันกระแทกใส่ Laptop 15.6 นิ้ว กันน้ำ 100%', 'Cordura 500D Waterproof', '45 x 30 x 15 cm', 'Space Grey', 'NEW'),
('BAG-BPK-32', 'Heritage Leather Daypack', 'เป้หนังแท้สไตล์คลาสสิกเดย์แพ็ค', 'backpack', 4890.00, 2300.00, 9, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 'เป้หนังแท้ทั้งใบ ฝาปิดพร้อมสายรัดเข็มขัดคู่ สวยคลาสสิก เหมาะสำหรับเดินทางและทำงาน', 'Top Grain Vintage Leather', '40 x 30 x 14 cm', 'Cognac Saddle', 'BESTSELLER'),
('BAG-BPK-33', 'Mini Chic Urban Leather Backpack', 'มินิเป้หนังแฟชั่นสำหรับผู้หญิง', 'backpack', 2390.00, 1050.00, 25, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 'เป้ขนาดกะทัดรัดน่ารัก สายสะพายสามารถปรับเป็นสะพายข้างได้ 2-in-1', 'Soft Pebble Vegan Leather', '26 x 22 x 10 cm', 'Blush Pink', 'HOT'),
('BAG-BPK-34', 'Commuter Slim Laptop Backpack', 'เป้ใส่แล็ปท็อปทรงสลิมคนทำงาน', 'backpack', 2190.00, 900.00, 22, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', 'เป้ทรงบางเฉียบ เหมาะขึ้นรถไฟฟ้า มีพอร์ตชาร์จ USB ด้านข้าง และช่องซ่อนเงินด้านหลัง', 'Water-repellent Oxford Poly', '43 x 29 x 10 cm', 'Midnight Black', ''),
('BAG-BPK-35', 'Nomad Waxed Canvas Outdoor Backpack', 'เป้ผ้าแคนวาสเคลือบแว็กซ์สไตล์เอาท์ดอร์', 'backpack', 3690.00, 1700.00, 14, 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', 'ผ้าแคนวาสหนาเคลือบแว็กซ์กันน้ำ ทนทานทุกสภาพอากาศ ตกแต่งด้วยหนังแท้หนาพิเศษ', 'Waxed Heavy Canvas 18oz & Leather', '44 x 32 x 16 cm', 'Khaki Green', 'LIMITED'),
('BAG-BPK-36', 'Starlight Metallic Fashion Backpack', 'เป้สะพายหลังหนังเมทัลลิกประกายดาว', 'backpack', 2550.00, 1100.00, 16, 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80', 'เป้แฟชั่นหนังเคลือบประกายเมทัลลิกวิบวับ เพิ่มความสนุกสนานให้กับการแต่งตัว', 'Metallic Coated Leather', '28 x 24 x 11 cm', 'Rose Gold Metallic', 'NEW'),
('BAG-TRV-05', 'Weekend Duffel Travel Bag', 'กระเป๋าเดินทางสไตล์วีคเอนเดอร์', 'travel', 4500.00, 2200.00, 8, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 'กระเป๋าเดินทางความจุ 45L ผ้ากันละอองน้ำ ผสมหนังแท้ ช่องใส่รองเท้าแยกด้านข้าง', 'Waterproof Ballistic Nylon & Leather', '52 x 30 x 26 cm', 'Olive Green & Leather', 'LIMITED'),
('BAG-TRV-38', 'Voyager All-Leather Weekender', 'กระเป๋าเดินทางหนังแท้รุ่นวอยเอเจอร์', 'travel', 6890.00, 3500.00, 6, 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=80', 'กระเป๋าเดินทางหนังวัวแท้ทั้งใบ ระดับไฮเอนด์ สำหรับนักเดินทางผู้รักความหรูหรา', 'Full Grain Italian Leather', '55 x 32 x 28 cm', 'Rich Dark Chocolate', 'BESTSELLER'),
('BAG-TRV-39', 'Aerolite Foldable Flight Duffle', 'กระเป๋าพับได้สำหรับพกพาขึ้นเครื่อง', 'travel', 1250.00, 490.00, 45, 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80', 'กระเป๋าเสริมพับเก็บใส่ซองเล็กได้ เสียบกับคันชักกระเป๋าล้อลากได้พอดี', 'Ultra-light Ripstop Nylon', '48 x 32 x 20 cm', 'Slate Blue', 'HOT'),
('BAG-TRV-40', 'Sport & Gym Duffle with Shoe Pocket', 'กระเป๋ายิมและกีฬาช่องแยกใส่รองเท้า', 'travel', 1790.00, 750.00, 30, 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', 'กระเป๋าออกกำลังกายและทริป 2 วัน ช่องระบายอากาศสำหรับรองเท้า และช่องใส่ชุดเปียก', 'Heavy Duty Oxford & TPU', '46 x 26 x 24 cm', 'Charcoal / Neon Trim', ''),
('BAG-TRV-41', 'Safari Canvas & Leather Holdall', 'กระเป๋าเดินทางแคนวาสสไตล์ซาฟารี', 'travel', 3890.00, 1800.00, 12, 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80', 'ผ้าแคนวาสลายทวิลหนาพิเศษ แต่งสายหนังแท้และหมุดทองเหลือง แข็งแรงทนทาน', 'Twill Canvas & Saddle Leather', '50 x 28 x 25 cm', 'Desert Sand & Tan', 'HOT'),
('BAG-TRV-42', 'Garment Suit Carrier Travel Bag', 'กระเป๋าเดินทางเก็บสูทและชุดราตรี 2-in-1', 'travel', 4290.00, 2000.00, 10, 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80', 'กางออกเป็นถุงคลุมสูทไม่ให้ยับ พับประกอบเป็นกระเป๋าดัฟเฟิลเดินทางได้ทันที', 'Anti-wrinkle Waterproof Fabric', '54 x 30 x 28 cm', 'Matte Executive Black', 'NEW'),
('BAG-WLT-09', 'Compact Multi-card Clutch Wallet', 'กระเป๋าคลัตช์ใส่บัตรและมือถือ', 'mini', 1150.00, 480.00, 25, 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', 'กระเป๋าสตางค์และคลัตช์ขนาดพกพา ใส่การ์ดได้ 12 ใบ พร้อมช่องซิปเหรียญและสายคล้องข้อมือ', 'Cross-grain Leather', '19 x 10 x 2.5 cm', 'Dusty Rose', 'NEW'),
('BAG-MIN-44', 'Prestige Zip-Around Long Wallet', 'กระเป๋าสตางค์ซิปรอบหนังแท้ทรงยาว', 'mini', 1850.00, 800.00, 28, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', 'ซิปรูดรอบปกป้องของด้านใน ใส่ธนบัตรไม่ต้องพับ มีช่องใส่เหรียญและบัตร 16 ช่อง', 'Full Grain Saffiano Leather', '20 x 10.5 x 2.5 cm', 'Classic Black', 'BESTSELLER'),
('BAG-MIN-45', 'Slim MagSafe Leather Cardholder', 'กระเป๋าเก็บบัตรทรงบางเฉียบแม่เหล็ก', 'mini', 690.00, 250.00, 50, 'https://images.unsplash.com/photo-1614179689702-355944cf0918?auto=format&fit=crop&w=800&q=80', 'ที่ใส่บัตรหนังแท้ขนาดบางเฉียบ จุบัตรได้ 6 ใบ พกใส่กระเป๋าเสื้อได้พอดี', 'Vegetable Tanned Leather', '10 x 7.5 x 0.5 cm', 'Caramel & Gold', 'HOT'),
('BAG-MIN-46', 'Glamour Satin Evening Minaudière', 'กระเป๋าคลัตช์ซาตินประดับเพชรออกงาน', 'mini', 2690.00, 1100.00, 15, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', 'กระเป๋าคลัตช์กล่องหุ้มผ้าซาตินเงางาม ตัวล็อคเพชรคริสตัล มีสายโซ่สะพายถอดได้', 'Duchess Satin & Austrian Crystals', '18 x 11 x 5 cm', 'Silver Sparkle', 'LIMITED'),
('BAG-MIN-47', 'Bespoke Coin & Key Pouch', 'กระเป๋าใส่เหรียญและพวงกุญแจหนังแท้', 'mini', 790.00, 290.00, 35, 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80', 'กระเป๋าจิ๋วใส่กุญแจบ้านและเหรียญ มีห่วงคล้องกระเป๋าใหญ่ สวยน่ารักและใช้ประโยชน์ได้จริง', 'Pebble Leather & Brass Keyring', '11 x 7 x 2 cm', 'Honey Mustard', ''),
('BAG-MIN-48', 'Trifold Compact Leather Wallet', 'กระเป๋าสตางค์พับสามทบขนาดกะทัดรัด', 'mini', 1390.00, 580.00, 30, 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80', 'กระเป๋าสตางค์พับสามตอน ขนาดเล็กจิ๋วแต่ใส่แบงก์พันได้ครบ ช่องใส่บัตร 8 ช่อง', 'Smooth Calfskin', '10 x 8 x 3 cm', 'Sage Green', 'NEW'),
('BAG-MIN-49', 'Velvet Ribbon Wristlet Clutch', 'กระเป๋าคลัตช์คล้องมือโบว์กำมะหยี่', 'mini', 1590.00, 650.00, 22, 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80', 'กระเป๋าคลัตช์คล้องข้อมือตกแต่งโบว์กำมะหยี่หวานซ่อนเปรี้ยว เหมาะกับงานปาร์ตี้', 'Premium Velvet & Satin Lining', '22 x 14 x 3 cm', 'Ruby Red Velvet', 'HOT'),
('BAG-MIN-50', 'Aurelia Metallic Card & Lipstick Case', 'กระเป๋ามินิใส่ลิปสติกและการ์ดออเรเลีย', 'mini', 1290.00, 520.00, 26, 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&w=800&q=80', 'กระเป๋าไซส์ไมโครพร้อมกระจกเงาด้านใน ใส่ลิปสติกและบัตร 2 ใบ สายโซ่สะพายครอสบอดี้ได้', 'Metallic Microfiber Leather', '11 x 9 x 4 cm', 'Champagne Gold', 'LIMITED')
ON CONFLICT (sku) DO NOTHING;
