/*
  # Drunch Café Database Schema

  ## Tables Created
  
  1. **menu_items**
     - `id` (uuid, primary key)
     - `name` (text) - Menu item name
     - `description` (text) - Item description
     - `price` (numeric) - Price in PKR
     - `category` (text) - breakfast, lunch, beverages, desserts
     - `image_url` (text) - Image URL
     - `is_available` (boolean) - Availability status
     - `created_at` (timestamptz)

  2. **reservations**
     - `id` (uuid, primary key)
     - `name` (text) - Customer name
     - `email` (text) - Customer email
     - `phone` (text) - Contact number
     - `date` (date) - Reservation date
     - `time` (text) - Reservation time
     - `guests` (integer) - Number of guests
     - `message` (text) - Special requests
     - `status` (text) - pending, confirmed, cancelled
     - `created_at` (timestamptz)

  3. **reviews**
     - `id` (uuid, primary key)
     - `name` (text) - Customer name
     - `rating` (integer) - Rating 1-5
     - `comment` (text) - Review text
     - `is_approved` (boolean) - Moderation status
     - `created_at` (timestamptz)

  4. **contact_messages**
     - `id` (uuid, primary key)
     - `name` (text) - Sender name
     - `email` (text) - Sender email
     - `message` (text) - Message content
     - `is_read` (boolean)
     - `created_at` (timestamptz)

  5. **orders**
     - `id` (uuid, primary key)
     - `customer_name` (text)
     - `customer_email` (text)
     - `customer_phone` (text)
     - `items` (jsonb) - Order items array
     - `total_amount` (numeric)
     - `delivery_address` (text)
     - `status` (text) - pending, preparing, delivered
     - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access where appropriate
  - Add policies for authenticated insert operations
*/

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL CHECK (category IN ('breakfast', 'lunch', 'beverages', 'desserts')),
  image_url text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available menu items"
  ON menu_items FOR SELECT
  USING (is_available = true);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  guests integer NOT NULL CHECK (guests > 0),
  message text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Anyone can submit reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  items jsonb NOT NULL,
  total_amount numeric NOT NULL,
  delivery_address text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'delivered', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
  ('Classic Breakfast', 'Scrambled eggs, toast, hash browns, and bacon', 850, 'breakfast', 'https://images.pexels.com/photos/101533/pexels-photo-101533.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Pancake Stack', 'Fluffy pancakes with maple syrup and butter', 650, 'breakfast', 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Avocado Toast', 'Fresh avocado on sourdough with poached eggs', 750, 'breakfast', 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Grilled Chicken Burger', 'Juicy grilled chicken with fresh vegetables', 950, 'lunch', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Caesar Salad', 'Crisp romaine lettuce with parmesan and croutons', 700, 'lunch', 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Pasta Carbonara', 'Creamy pasta with bacon and parmesan', 1100, 'lunch', 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Cappuccino', 'Rich espresso with steamed milk foam', 350, 'beverages', 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Fresh Juice', 'Seasonal fresh fruit juice', 400, 'beverages', 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Iced Latte', 'Cold espresso with milk and ice', 450, 'beverages', 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Chocolate Cake', 'Rich chocolate cake with ganache', 550, 'desserts', 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Cheesecake', 'Creamy New York style cheesecake', 600, 'desserts', 'https://images.pexels.com/photos/2762939/pexels-photo-2762939.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Ice Cream Sundae', 'Three scoops with toppings', 500, 'desserts', 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (name, rating, comment, is_approved) VALUES
  ('Sarah Ahmed', 5, 'Amazing food and great ambiance! The staff is so friendly and welcoming. Highly recommend the pasta carbonara.', true),
  ('Hassan Ali', 5, 'Best café in Karachi! Perfect spot for family gatherings. The breakfast menu is outstanding.', true),
  ('Ayesha Khan', 4, 'Love the cozy atmosphere and delicious coffee. Great place to hang out with friends.', true),
  ('Ahmed Raza', 5, 'Exceptional service and quality food. The chocolate cake is a must-try!', true)
ON CONFLICT DO NOTHING;