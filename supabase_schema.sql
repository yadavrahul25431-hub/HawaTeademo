-- HAWAtea - Supabase Schema Migration

-- 1. Custom Types
CREATE TYPE user_role AS ENUM ('owner', 'staff', 'customer');
CREATE TYPE order_status AS ENUM ('PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED');

-- 2. Tables

-- Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'customer'::user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Menu Items Table
CREATE TABLE public.menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Orders Table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  table_number TEXT,
  total_amount NUMERIC(10, 2) NOT NULL,
  status order_status DEFAULT 'PENDING'::order_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Order Items Table
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id UUID REFERENCES public.menu_items(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


-- 3. Row Level Security (RLS) Configuration

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Helper Function to Check User Role
CREATE OR REPLACE FUNCTION public.check_user_role(required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Profiles Policies
CREATE POLICY "Users can read their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Menu Items Policies
CREATE POLICY "Menu is globally readable if available" ON public.menu_items
  FOR SELECT USING (is_available = true);
  
CREATE POLICY "Staff/Owner can read all menu items" ON public.menu_items
  FOR SELECT USING (check_user_role('owner') OR check_user_role('staff'));

CREATE POLICY "Staff/Owner can mutate menu items" ON public.menu_items
  FOR ALL USING (check_user_role('owner') OR check_user_role('staff'));


-- Orders Policies
CREATE POLICY "Anyone can insert an order" ON public.orders
  FOR INSERT WITH CHECK (true);
  
CREATE POLICY "Staff/Owner can read all orders" ON public.orders
  FOR SELECT USING (check_user_role('owner') OR check_user_role('staff'));
  
CREATE POLICY "Staff/Owner can update orders" ON public.orders
  FOR UPDATE USING (check_user_role('owner') OR check_user_role('staff'));
  
-- Public read for specific order (e.g., tracking page with UUID)
CREATE POLICY "Public can read order by ID" ON public.orders
  FOR SELECT USING (true);


-- Order Items Policies
CREATE POLICY "Anyone can insert order items" ON public.order_items
  FOR INSERT WITH CHECK (true);
  
CREATE POLICY "Staff/Owner can read all order items" ON public.order_items
  FOR SELECT USING (check_user_role('owner') OR check_user_role('staff'));
  
CREATE POLICY "Public can read order items" ON public.order_items
  FOR SELECT USING (true);


-- 4. Enable Realtime
-- This enables Supabase Realtime for the orders table to power the KDS
ALTER PUBLICATION supabase_realtime ADD TABLE orders;


-- 5. Seed Data (Menu Items)
INSERT INTO public.menu_items (name, description, price, category, image_url) VALUES
('Classic Kadak Chai', 'Slow-brewed strong Assam tea with milk and signature spices.', 4.50, 'Chai', 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop'),
('Saffron Turmeric Latte', 'A golden brew of premium Kashmiri saffron and organic turmeric.', 5.50, 'Chai', 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop'),
('Filter Kaapi', 'South Indian style chicory blend coffee frothed to perfection.', 4.00, 'Coffee', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop'),
('Bun Maska', 'Freshly baked brioche bun slathered with sweet clotted cream.', 3.50, 'Bites', NULL),
('Samosa Chaat', 'Crushed samosas topped with yogurt, tamarind chutney and sev.', 6.50, 'Bites', NULL);
